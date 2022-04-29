import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  readonly discount: number;
  readonly parentId: number;
}
