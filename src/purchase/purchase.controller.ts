import { Controller, Post, Body, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('purchases')
@ApiTags('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  async get() {
    return this.purchaseService.find();
  }
}
