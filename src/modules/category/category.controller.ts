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
import { CategoryService } from './category.service';
import { Category as CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestDto } from '../products/dto/badRequest.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Role } from '../users/dto/user.dto';

@ApiTags('Product category')
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ type: CategoryDto, status: 200 })
  @ApiBadRequestResponse({ type: BadRequestDto, status: 400 })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    // find the category with this id
    const category = await this.categoryService.findOne(id);

    // if the category doesn't exit in the db, throw a 404 error
    if (!category) {
      throw new NotFoundException("This category doesn't exist");
    }

    // if category exist, return the category
    return category;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.SUPERADMIN)
  @ApiCreatedResponse({ type: CategoryDto, status: 201 })
  @ApiBadRequestResponse({ type: BadRequestDto, status: 400 })
  @ApiBody({ type: CategoryDto })
  @Post()
  @HttpCode(201)
  create(
    @Body() category: CategoryDto,
    @Request() req,
  ): Promise<CategoryEntity> {
    // create a new category and return the newly created category
    return this.categoryService.create(category, req.user.id);
  }
}
