import { RoleService } from './../roles/roles.service';
import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public, ResponseMessage, User } from '../decorator/customize';

import { RegisterUserDto, UserLoginDto } from '../users/dto/create-user.dto';

import { Request, Response } from 'express';
import { Iuser } from '@app/users/users.interface';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private rolesService: RoleService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 60) // 5 requests per minute
  @ApiBody({ type: UserLoginDto })
  @Post('login')
  @ResponseMessage('Login user')
  async handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessTokenNinfo = await this.authService.login(req.user, response);
    return accessTokenNinfo;
  }
  @Public()
  @Post('register')
  @ResponseMessage('Register a new user')
  handlRegister(@Body() RegisterUserDto: RegisterUserDto) {
    return this.authService.register(RegisterUserDto);
  }

  @Get('account')
  @ResponseMessage('get user info')
  async handleGetAccount(@User() user: Iuser) {
    const temp = (await this.rolesService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    return { user };
  }
  @Public()
  @Get('refresh')
  @ResponseMessage('get user info by refresh token')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processRefreshToken(refreshToken, response);
  }
  @Post('logout')
  @ResponseMessage('Logout user')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: Iuser,
  ) {
    return this.authService.logout(response, user);
  }
}
