import { RoleService } from './../../roles/roles.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Iuser } from 'src/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private rolesService: RoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_TOKEN_SECRET'),
    });
  }

  async validate(payload: Iuser) {
    const { _id, name, email, role } = payload;

    const userRole = role as unknown as { _id: string; name: string };
    const temp = (await this.rolesService.findOne(userRole._id)) as any;

    //req.user = payload;
    return { _id, name, email, role, permissions: temp?.permissions ?? [] };
  }
}
