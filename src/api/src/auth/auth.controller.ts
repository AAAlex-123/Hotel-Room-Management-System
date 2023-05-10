import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(@Body() login: { username: string; pass: string }) {
    return await this.authService.signIn(login.username, login.pass);
  }
}
