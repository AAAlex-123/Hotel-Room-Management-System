import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signInClient(login: string) {
    const client = await this.prisma.reservation.findFirst({
      where: {
        client: {
          cellphone: {
            endsWith: login,
          },
        },
      },
      include: {
        client: true,
      },
    });
    if (client === undefined) throw new UnauthorizedException();

    const payload = {
      username: client.client.name,
      sub: client.client.client_id,
    };
    return {
      client_id: client.client_id,
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

    const pepperPass = await bcrypt.compare(password, user.password);
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
