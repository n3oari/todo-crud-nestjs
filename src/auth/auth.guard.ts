import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from '../../constants';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { };


  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHead(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: JWT_CONSTANTS.secret
        }
      );

      //inject the payload into the request object /profile/(user)
      request.user = payload;

    } catch {
      throw new UnauthorizedException('Token is invalid');
    }
    return true;
  }

  private extractTokenFromHead(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;

  }
}
