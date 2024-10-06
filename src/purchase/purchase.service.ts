import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  DeepPartial,
  UpdateResult,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AnalyticsService } from '../shared/analytics.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private analyticsService: AnalyticsService,
  ) {}

  private calculateAstrologyReportTime() {
    return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    purchase.astrologyReportTime = this.calculateAstrologyReportTime();
    const savedPurchase = await this.purchaseRepository.save(purchase);

    this.analyticsService.sendEvent(savedPurchase);

    return savedPurchase;
  }

  async find(options?: FindManyOptions<Purchase>): Promise<Purchase[]> {
    return this.purchaseRepository.find(options);
  }

  async update(id: string, data: DeepPartial<Purchase>): Promise<UpdateResult> {
    return this.purchaseRepository.update(id, data);
  }
}
