
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExpressRequest } from './auth.guard';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/user/entities/user.schema';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        
        private readonly reflector: Reflector, 
      ) {}

      canActivate(context: ExecutionContext): boolean {
        const request:ExpressRequest = context.switchToHttp().getRequest();
      
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException('You need to be authenticated to access this resource.');
          }
          const requiredRoles:UserRole[] = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
          if (!requiredRoles) {
            return true; 
          }
          const hasRole = requiredRoles.some((role) => user.role?.includes(role));
          if (!hasRole) {
            throw new ForbiddenException('You do not have the necessary permissions.');
          }
        return true;
      }

}

