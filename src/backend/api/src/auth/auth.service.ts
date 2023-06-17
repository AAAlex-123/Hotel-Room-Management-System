import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signInClient(login: string, room: string) {
    if (login.length < 6) throw new UnauthorizedException();
    const client = await this.prisma.room.findFirst({
      where: {
        room_id: room,
        Reservation: {
          some: {
            checked_status: ReservationStatus.CHECKEDIN,
            departure: {
              gte: new Date(),
            },
            arrival: {
              lte: new Date(),
            },
            cellphone: {
              endsWith: login,
            },
          },
        },
      },
      include: {
        Reservation: true,
      },
    });
    if (client === null || client === undefined)
      throw new UnauthorizedException();
    const payload = {
      username: client.Reservation[0].reservation_id,
      sub: client.Reservation[0].name,
    };
    return {
      reservation_id: client.Reservation[0].reservation_id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, password: string) {
    const user = await this.prisma.employee.findFirst({
      where: {
        username,
      },
    });
    if (user === undefined || user === null) throw new UnauthorizedException();
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
