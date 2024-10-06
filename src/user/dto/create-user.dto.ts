import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  marketingData: string;
}
