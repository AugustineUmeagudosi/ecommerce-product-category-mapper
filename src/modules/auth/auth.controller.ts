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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  @HttpCode(201)
  signUp(@Body() user: UserDto) {
    return this.authService.create(user);
  }
}
