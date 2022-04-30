import { SetMetadata } from '@nestjs/common';
import { Role } from '../../modules/users/dto/user.dto';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
