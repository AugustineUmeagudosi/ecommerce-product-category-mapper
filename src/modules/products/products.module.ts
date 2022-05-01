import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { productProviders } from './products.providers';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [ProductService, ...productProviders],
  controllers: [ProductsController],
  imports: [CategoryModule],
})
export class ProductsModule {}
