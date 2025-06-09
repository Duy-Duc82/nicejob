import { RoleService } from './../roles/roles.service';
import { RegisterUserDto } from './../users/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Iuser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RoleService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isValid = await this.usersService.comparePasswords(
        pass,
        user.password,
      );
      if (isValid === true) {
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = (await this.rolesService.findOne(userRole._id)) as any;

        const objUser = {
          ...user.toObject(),
          permissions: temp?.permissions ?? [],
        };

        return objUser;
      }
    }
    return null;
  }
  async login(user: Iuser, response: Response) {
    const { _id, name, email, role, permissions } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    const refresh_token = this.createRefreshToken(payload);
    //update user with refresh token
    await this.usersService.updateRefreshToken(refresh_token, _id);
    //set refresh token to cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge:
        ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')) *
        1000,
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
        permissions: permissions ?? [],
      },
    };
  }
  async register(user: RegisterUserDto) {
    try {
      let newUser = await this.usersService.register(user);
      return {
        _id: newUser?._id,
        createdAt: newUser?.createdAt,
      };
    } catch (err) {
      throw new Error(`Failed to register user: ${err.message}`);
    }
  }
  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')) /
        1000,
    });
    return refresh_token;
  };
  processRefreshToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      let user = await this.usersService.findUserByRefreshToken(refreshToken);
      if (user) {
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token refresh',
          iss: 'from server',
          _id,
          name,
          email,
          role,
        };
        //create new refresh token
        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updateRefreshToken(
          refresh_token,
          _id.toString(),
        );

        //fletch user role
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = (await this.rolesService.findOne(userRole._id)) as any;

        //clear old refresh token before setting new one
        response.clearCookie('refresh_token');
        //set refresh token to cookie
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge:
            ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')) *
            1000,
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? [],
          },
        };
      } else {
        throw new BadRequestException(
          'refresh token is invalid,please login again',
        );
      }
    } catch (err) {
      throw new BadRequestException(
        'refresh token is invalid,please login again',
      );
    }
  };
  logout = async (response: Response, user: Iuser) => {
    await this.usersService.updateRefreshToken('', user._id);
    response.clearCookie('refresh_token');
    return 'Logout success';
  };
}
