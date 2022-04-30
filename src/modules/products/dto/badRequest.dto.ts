import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({
    name: 'status',
    type: Number,
    example: 400,
  })
  readonly status: number;

  @ApiProperty({
    name: 'message',
    type: String,
    example: 'Validation failed (numeric string is expected)',
  })
  readonly message: string;

  @ApiProperty({
    name: 'error',
    type: String,
    example: 'Bad Request',
  })
  readonly error: string;
}
