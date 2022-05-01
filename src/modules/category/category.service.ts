import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  async create(category: CategoryDto, createdBy): Promise<Category> {
    if (category.parentId) {
      const parentExists = await this.findOne(category.parentId);
      if (!parentExists)
        throw new NotFoundException("This parentId doesn't exist");
    }
    return this.postRepository.create<Category>({ ...category, createdBy });
  }

  findOne(id): Promise<Category> {
    return this.postRepository.findOne({
      where: { id },
      include: [
        { model: User, as: 'creator', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categoryParent' },
      ],
    });
  }
}
