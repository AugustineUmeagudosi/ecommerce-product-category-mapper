import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    name: 'name',
    description: 'product name',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    name: 'discount',
    description: 'product discount',
    type: Number,
    required: false,
  })
  readonly discount: number;

  @ApiProperty({
    name: 'amount',
    description: 'product amount',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({
    name: 'categoryId',
    description: 'product category',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  readonly categoryId: number;

  readonly productCode: string;
}
