import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';
import { Public } from './decorator';

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
  @Public()
  async signIn(@Body() login: Login) {
    return await this.authService.signIn(login.login, login.password);
  }
  // @Public()
  @Post('client')
  async signInPrestige(@Body() { login }: { login: string }) {
    return await this.authService.signInClient(login);
  }
}
