import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { User } from '../users/user.entity';
import { PRODUCT_REPOSITORY } from '../../core/constants';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  create(product: ProductDto, createdBy: number): Promise<Product> {
    return this.productRepository.create<Product>({ ...product, createdBy });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Category },
      ],
    });
  }
}
