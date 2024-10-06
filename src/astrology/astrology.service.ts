import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { PurchaseService } from '../purchase/purchase.service';

@Injectable()
export class AstrologyService {
  private readonly logger = new Logger(AstrologyService.name);

  constructor(
    private httpService: HttpService,
    private purchaseService: PurchaseService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendScheduledReports() {
    const now = new Date();
    const scheduledPurchases = await this.purchaseService.find({
      where: {
        astrologyReportTime: LessThan(now),
        astrologyReportSent: false,
      },
      relations: ['user'],
    });

    for (const purchase of scheduledPurchases) {
      try {
        await this.httpService
          .post('https://astrology-service.example.com/report', {
            userId: purchase.user.id,
          })
          .toPromise();
        await this.purchaseService.update(purchase.id, {
          astrologyReportSent: true,
        });
        this.logger.log(`Sent astrology report for user ${purchase.user.id}`);
      } catch (error) {
        this.logger.error(
          `Failed to send astrology report for user ${purchase.user.id}`,
          error,
        );
      }
    }
  }
}
