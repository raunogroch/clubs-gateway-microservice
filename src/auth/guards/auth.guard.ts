import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NatsClientService } from '../../transports/nats-client.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly clientService: NatsClientService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const response = (await this.clientService.send(
        'user.auth.verify',
        token,
      )) as { user: unknown; token: string };

      const { user, token: verifiedToken } = response;
      request.user = user;
      request.token = verifiedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
