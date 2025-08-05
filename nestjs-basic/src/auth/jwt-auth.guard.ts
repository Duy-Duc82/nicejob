import { permission } from 'process';
import { Request } from 'express';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from '../decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const isSkipPermission = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_PERMISSION,
      [context.getHandler(), context.getClass()],
    );
    if (err || !user) {
      throw err || new UnauthorizedException('invalid token');
    }
    //check permissions
    const targetMethod = request.method;

    const targetEndpoint = request.route?.path as string;

    const permission = user.permissions ?? [];
    let isExits = permission.find(
      (permission) =>
        targetMethod === permission.method &&
        targetEndpoint === permission.apiPath,
    );
    if (targetEndpoint.startsWith('/api/v1/auth')) isExits = true;
    if (!isExits && !isSkipPermission) {
      throw new ForbiddenException(
        `You do not have permission to access ${targetMethod} ${targetEndpoint}`,
      );
    }

    return user;
  }
}
