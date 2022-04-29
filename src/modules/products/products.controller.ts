import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './products.service';
import { Product as ProductEntity } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly categoryService: ProductService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    // find the product with this id
    const product = await this.categoryService.findOne(id);

    // if the product doesn't exit in the db, throw a 404 error
    if (!product) {
      throw new NotFoundException("This product doesn't exist");
    }

    // if product exist, return the product
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() product: ProductDto, @Request() req): Promise<ProductEntity> {
    // create a new product and return the newly created product
    return this.categoryService.create(product, req.user.id);
  }
}
