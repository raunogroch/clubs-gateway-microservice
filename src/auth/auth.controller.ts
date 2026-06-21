import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import type { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.client.send('user.auth.register', registerDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.client.send('user.auth.login', loginDto).pipe(
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
