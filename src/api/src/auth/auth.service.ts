import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signInClient(login: string) {
    const client = await this.prisma.reservation.findFirst({
      where: {
        cellphone: {
          endsWith: login,
        },
      },
    });
    if (client === undefined) throw new UnauthorizedException();

    const payload = {
      username: client.name,
      sub: client.cellphone,
    };
    return {
      reservation_id: client.reservation_id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, password: string) {
    const user = await this.prisma.employee.findFirst({
      where: {
        username,
      },
    });
    if (user === undefined) throw new UnauthorizedException();
    const pepperPass = await compare(password, user.password);
    if (!pepperPass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.employee_id };
    return {
      employee_id: user.employee_id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
