import { Injectable, Inject } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { User } from '../users/user.entity';
import { CATEGORY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly postRepository: typeof Category,
  ) {}

  create(category: CategoryDto, createdBy): Promise<Category> {
    return this.postRepository.create<Category>({ ...category, createdBy });
  }

  findOne(id): Promise<Category> {
    return this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }
}
