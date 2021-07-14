import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoginDto } from 'src/dto/login.dto';

@ApiBearerAuth()
@ApiTags('用户模块')
@Controller('/user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户测试' })
  @Get('/test')
  userTest(): string {
    return 'user test...';
  }

  @ApiOperation({ summary: '用户登录' })
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return 1;
    return this.authService.login(loginDto);
  }
}
