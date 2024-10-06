import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AstrologyService } from './astrology.service';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  imports: [HttpModule, PurchaseModule],
  providers: [AstrologyService],
  exports: [AstrologyService],
})
export class AstrologyModule {}
