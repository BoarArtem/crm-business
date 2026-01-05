import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly bot: Bot;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {
    const token = this.configService.getOrThrow<string>('BOT_TOKEN');
    this.bot = new Bot(token);
  }

  onModuleInit() {
    this.bot.command('start', (ctx) =>
      ctx.reply(
        'Приветствую. Я помощник вашей CRM-системы.\nВведите /help, чтобы увидеть доступные команды.',
      ),
    );

    this.bot.command('help', (ctx) =>
      ctx.reply(
        '/register_user <accessToken> — привязать Telegram к вашему аккаунту',
      ),
    );

    this.bot.command('register_user', async (ctx) => {
      const token = ctx.message?.text?.split(' ')[1];

      if (!token) {
        return ctx.reply(
          'Пожалуйста, укажите accessToken после команды.\nПример:\n/register_user eyJhbGciOi...',
        );
      }

      if (!ctx.from?.id) {
        return ctx.reply('Не удалось определить Telegram ID.');
      }

      try {
        const payload = await this.authService.verifyJwt(token);

        const user = await this.prismaService.user.findUnique({
          // eslint-disable-next-line @typescript-eslint/unbound-method
          where: { id: String(payload.sub) },
        });

        if (!user) {
          return ctx.reply('Пользователь не найден.');
        }

        if (user.telegramId) {
          return ctx.reply('Telegram уже привязан к этому аккаунту.');
        }

        await this.prismaService.user.update({
          where: { id: user.id },
          data: { telegramId: BigInt(ctx.from.id) },
        });

        await ctx.reply(
          'Telegram успешно привязан.\nТеперь вы можете взаимодействовать с CRM напрямую.',
        );
      } catch {
        await ctx.reply(
          'Не удалось выполнить привязку.\nПроверьте токен или попробуйте позже.',
        );
      }
    });

    this.bot.start();
    console.log('Telegram бот запущен');
  }
}
