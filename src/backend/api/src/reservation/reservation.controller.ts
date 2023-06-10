import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationClientEntity } from './reservation.client.entity/reservation.client.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChargeType } from '@prisma/client';

@Controller('api/reservation')
@ApiTags('reservation')
@ApiBearerAuth('JWT-auth')
export class ReservationController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async allReservation(
    @Query()
    { search }: { search?: string },
  ) {
    return await this.prisma.reservation.findMany({
      where: {
        name: {
          contains: search,
        },
        cellphone: {
          contains: search,
        },
        email: {
          contains: search,
        },
      },
      include: {
        charge: true,
      },
    });
  }

  @Get(':id')
  @ApiQuery({ name: 'room', type: Boolean, required: false })
  async getById(
    @Param('id') id: number,
    @Query() { room }: { room?: boolean },
  ) {
    const r = room ? Boolean(room) : false;
    return await this.prisma.reservation.findUnique({
      where: { reservation_id: id },
      include: {
        room: r,
        charge: true,
      },
    });
  }

  @Post()
  async create(@Body() reservation: ReservationClientEntity) {
    Logger.debug(reservation);
    reservation.visitor = reservation.visitor
      ? Number(reservation.visitor)
      : undefined;
    reservation.arrival = new Date(reservation.arrival);
    reservation.departure = new Date(reservation.departure);
    reservation.bill = reservation.bill ? Number(reservation.bill) : undefined;
    if (
      reservation.arrival < new Date() ||
      reservation.departure < reservation.arrival
    ) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: 'invalid duration' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const f = await this.prisma.reservation.findMany({
      where: {
        room_id: reservation.room_id,
        arrival: {
          lte: reservation.departure,
        },
        departure: {
          gte: reservation.arrival,
        },
      },
    });
    if (f.length !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: `Reservations don't align`,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const { bill, ...rest } = reservation;
    return await this.prisma.reservation.create({
      data: {
        ...rest,
        charge: {
          create: {
            amount: bill,
            description: 'Initial Charge',
            type: ChargeType.CHARGE,
          },
        },
      },
    });
  }

  @Delete(':id')
  async deletes(@Param('id') id: number) {
    return await this.prisma.reservation.deleteMany({
      where: { reservation_id: id },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() reservation: ReservationClientEntity,
  ) {
    const { reservation_id, ...rest } = reservation;
    await this.prisma.reservation.upsert({
      create: { ...rest },
      update: {
        ...rest,
      },
      where: {
        reservation_id: id,
      },
    });
  }
}
