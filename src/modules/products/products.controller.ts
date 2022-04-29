import {
  Controller,
  Get,
  Post,
  HttpCode,
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
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    // find the product with this id
    const product = await this.productService.findOne(id);

    // if the product doesn't exit in the db, throw a 404 error
    if (!product) {
      throw new NotFoundException("This product doesn't exist");
    }

    // if product exist, return the product
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  create(@Body() product: ProductDto, @Request() req): Promise<ProductEntity> {
    // create a new product and return the newly created product
    return this.productService.create(product, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/discount')
  @HttpCode(200)
  async getdiscount(@Request() req): Promise<any> {
    // fetch a product's discount
    const discount = await this.productService.getDiscount({
      productCode: req.query.productCode,
      id: req.query.id,
      amount: req.query.amount,
    });

    if (!discount) throw new NotFoundException("This product doesn't exist");
    return discount;
  }
}
