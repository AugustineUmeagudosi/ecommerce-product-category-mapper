import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { User } from '../users/user.entity';
import { PRODUCT_REPOSITORY } from '../../core/constants';
import { Category } from '../category/category.entity';
import { Chance } from 'chance';
import { Op } from 'sequelize';

const chance = new Chance();
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  create(product: ProductDto, createdBy: number): Promise<Product> {
    const productCode = chance.string({
      length: 8,
      alpha: true,
      numeric: true,
    });
    console.log(productCode);
    return this.productRepository.create<Product>({
      ...product,
      createdBy,
      productCode,
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Category,
          include: [{ model: Category }],
        },
      ],
    });
  }

  findByProductCode(productCode: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { productCode },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Category,
          include: [{ model: Category }],
        },
      ],
    });
  }

  findByProductCodeOrId(productCode: string, id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        [Op.or]: [{ id }, { productCode }],
      },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Category,
          include: [{ model: Category }],
        },
      ],
    });
  }

  async getDiscount({ productCode, id, amount }): Promise<any> {
    if (!productCode && !id) return false;

    let product;
    if (productCode && !id) product = await this.findByProductCode(productCode);
    if (!productCode && id) product = await this.findOne(id);
    if (productCode && id)
      product = await this.findByProductCodeOrId(productCode, id);

    if (!product) return false;
    return this.checkforDiscount(product, amount);
  }

  checkforDiscount(product: Product, amount: number): object | number {
    if (product.discount && product.discount !== 0) {
      const discountedPrice = this.calculateDiscount(product.discount, amount);
      return {
        productCode: product.productCode,
        productName: product.name,
        amount,
        percentageDiscount: product.discount,
        discountedPrice,
      };
    }

    if (product.category.discount && product.category.discount !== 0) {
      const discountedPrice = this.calculateDiscount(
        product.category.discount,
        amount,
      );
      return {
        productCode: product.productCode,
        productName: product.name,
        amount,
        percentageDiscount: product.category.discount,
        discountedPrice,
      };
    }

    if (product.category.categoryParent.discount) {
      const discountedPrice = this.calculateDiscount(
        product.category.categoryParent.discount,
        amount,
      );
      return {
        productCode: product.productCode,
        productName: product.name,
        amount,
        percentageDiscount: product.category.categoryParent.discount,
        discountedPrice,
      };
    }

    return -1;
  }

  calculateDiscount(discount: number, amount: number): number {
    return Number((amount - (amount * discount) / 100).toPrecision(4));
  }
}
