import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { productProviders } from './products.providers';

@Module({
  providers: [ProductService, ...productProviders],
  controllers: [ProductsController],
})
export class ProductsModule {}
