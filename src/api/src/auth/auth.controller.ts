import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';

class Login {
  @ApiProperty()
  login: string;
  @ApiProperty({})
  password: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async signIn(@Body() login: Login) {
    return await this.authService.signIn(login.login, login.password);
  }

  @Post('employee')
  async signInPrestige(@Body() { login }: { login: string }) {
    return await this.authService.signInClient(login);
  }
}
