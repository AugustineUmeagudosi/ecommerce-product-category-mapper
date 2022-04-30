import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ProductDiscountDto {
  @ApiProperty({
    name: 'productName',
    description: 'product name',
    type: String,
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly productName: string;

  @ApiProperty({
    name: 'percentageDiscount',
    description: 'product discount',
    type: Number,
  })
  readonly percentageDiscount: number;

  @ApiProperty({
    name: 'amount',
    description: 'product amount',
    type: Number,
  })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({
    name: 'discountedPrice',
    description: 'discount amount',
    type: Number,
  })
  @IsNotEmpty()
  readonly discountedPrice: number;

  @ApiProperty({
    name: 'productCode',
    description: 'product code',
    type: String,
  })
  readonly productCode: string;
}
