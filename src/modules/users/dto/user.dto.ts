import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

// enum Role {
//   ADMIN = 'admin',
//   SUPERADMIN = 'superAdmin',
// }

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  //   @IsNotEmpty()
  //   @IsEnum(Role, {
  //     message: 'role must be either admin or superAdmin',
  //   })
  //   readonly role: Role;
}
