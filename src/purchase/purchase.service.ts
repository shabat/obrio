import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AnalyticsService } from '../shared/analytics.service';
import { AstrologyService } from '../shared/astrology.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private analyticsService: AnalyticsService,
    private astrologyService: AstrologyService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    const savedPurchase = await this.purchaseRepository.save(purchase);

    this.analyticsService.sendEvent(savedPurchase);
    this.astrologyService.scheduleAstrologyReport(savedPurchase.userId);

    return savedPurchase;
  }

  async get(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }
}
