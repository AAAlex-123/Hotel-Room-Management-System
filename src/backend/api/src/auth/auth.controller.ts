import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';
import { Public } from './decorator';

class Login {
  @ApiProperty({ default: 'username' })
  login: string;
  @ApiProperty({ default: 'login' })
  password: string;
}

class Client {
  @ApiProperty({ default: '999999' })
  login: string;
  @ApiProperty({ default: '1' })
  room_id: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @Public()
  async signIn(@Body() login: Login) {
    return await this.authService.signIn(login.login, login.password);
  }
  @Public()
  @Post('client')
  async signInPrestige(@Body() { login, room_id }: Client) {
    return await this.authService.signInClient(login, room_id);
  }
}
