import { IsNotEmpty, MinLength } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  readonly discount: number;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly categoryId: number;

  readonly productCode: string;
}
