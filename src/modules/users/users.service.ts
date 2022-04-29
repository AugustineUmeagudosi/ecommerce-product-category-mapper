import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  create(user: UserDto): Promise<User> {
    return this.userRepository.create<User>(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { email } });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne<User>({ where: { id } });
  }
}
