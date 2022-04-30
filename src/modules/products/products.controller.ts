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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { Product as ProductEntity } from './product.entity';
import { ProductDto } from './dto/product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDiscountDto } from './dto/discountResponse.dto';
import { BadRequestDto } from './dto/badRequest.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Role } from '../users/dto/user.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({ name: 'id', type: Number, required: false })
  @ApiQuery({ name: 'productCode', type: String, required: false })
  @ApiQuery({ name: 'amount', type: Number, required: true })
  @ApiOkResponse({ type: ProductDiscountDto, status: 200 })
  @ApiOkResponse({ type: Number, status: 200 })
  @ApiBadRequestResponse({ type: BadRequestDto, status: 400 })
  @Get('/discount')
  @HttpCode(200)
  async getdiscount(
    @Query('id', ParseIntPipe) id: number,
    @Query('productCode') productCode: string,
    @Query('amount', ParseIntPipe) amount: number,
  ): Promise<any> {
    // fetch a product's discount
    const discount = await this.productService.getDiscount({
      productCode,
      id,
      amount,
    });

    if (!discount) throw new NotFoundException("This product doesn't exist");
    return discount;
  }

  @ApiOkResponse({ type: ProductDto, status: 200 })
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

  @UseGuards(RolesGuard)
  @Roles(Role.SUPERADMIN)
  @ApiCreatedResponse({ type: ProductDto, status: 201 })
  @ApiCreatedResponse()
  @ApiBody({ type: ProductDto })
  @Post()
  @HttpCode(201)
  create(@Body() product: ProductDto, @Request() req): Promise<ProductEntity> {
    // create a new product and return the newly created product
    return this.productService.create(product, req.user.id);
  }
}
