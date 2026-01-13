import { Controller, Res, Get } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Response } from 'express';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.prometheusService.getMetricts();

    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
