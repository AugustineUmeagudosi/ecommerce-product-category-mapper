import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    name: 'name',
    description: 'category name',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    name: 'discount',
    description: 'category discount',
    type: Number,
    required: false,
  })
  readonly discount: number;

  @ApiProperty({
    name: 'parentId',
    description: 'category parentId',
    type: Number,
    required: false,
  })
  readonly parentId: number;
}
