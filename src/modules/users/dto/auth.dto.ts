import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    name: 'username',
    description: 'user email',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    name: 'password',
    description: 'password',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
