import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OfferService } from './offer.service';

@Controller('offers')
@ApiTags('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  async get() {
    return this.offerService.get();
  }
}
