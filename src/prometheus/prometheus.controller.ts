import { Controller, Res, Get } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @ApiOperation({
    summary: 'Метрика мониторинга продакшена',
    description:
      'Позволяет админу мониторить продакшен с помощью технологии Prometheus и Grafana для удобного отображения',
  })
  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.prometheusService.getMetricts();

    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
