import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ required: true })
  offerId: string;
}
