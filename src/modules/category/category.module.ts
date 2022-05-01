import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';

@Module({
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
