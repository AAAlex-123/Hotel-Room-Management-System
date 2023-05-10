import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(username: string, password: string) {
    const user = await this.prisma.employee.findFirst({
      where: {
        username,
      },
    });
    if (user === undefined) {
      throw new UnauthorizedException();
    }

    const pepperPass = await bcrypt.compare(password, user.pass);
    if (!pepperPass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.employee_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
