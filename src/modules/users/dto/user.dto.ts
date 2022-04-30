import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum Role {
  ADMIN = 'admin',
  SUPERADMIN = 'superAdmin',
}

export class UserDto {
  @ApiProperty({
    name: 'email',
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

  @ApiProperty({
    name: 'role',
    description: 'user role',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'role must be either admin or superAdmin',
  })
  readonly role: Role;
}
