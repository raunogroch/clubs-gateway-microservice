import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import type { CurrentUser } from './interfaces';
import { NatsClientService } from '../transports/nats-client.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly clientService: NatsClientService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.clientService.send('user.auth.register', registerDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    return this.clientService.send('user.auth.login', loginDto);
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
