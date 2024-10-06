import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Purchase } from '../purchase/purchase.entity';

@Injectable()
export class AnalyticsService {
  constructor(private httpService: HttpService) {}

  sendEvent(purchase: Purchase) {
    this.httpService
      .post('https://analytics-service.example.com/event', {
        type: 'purchase',
        userId: purchase.userId,
        offerId: purchase.offerId,
      })
      .subscribe({
        error: (error) =>
          console.error('Failed to send analytics event', error),
      });
  }
}
