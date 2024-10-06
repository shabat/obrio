import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async find(options?: FindManyOptions<Offer>): Promise<Offer[]> {
    return this.offerRepository.find(options);
  }
}
