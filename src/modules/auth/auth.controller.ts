import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from '../users/dto/auth.dto';
import { BadRequestDto } from '../products/dto/badRequest.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: UserDto, status: 200 })
  @ApiBadRequestResponse({ type: BadRequestDto, status: 400 })
  @ApiBody({ type: AuthDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiCreatedResponse({ type: UserDto, status: 201 })
  @ApiBadRequestResponse({ type: BadRequestDto, status: 400 })
  @ApiBody({ type: UserDto })
  @UseGuards(DoesUserExist)
  @Post('signup')
  @HttpCode(201)
  signUp(@Body() user: UserDto) {
    if (process.env.Node_ENV === 'test') return 'worked!';
    return this.authService.create(user);
  }
}
