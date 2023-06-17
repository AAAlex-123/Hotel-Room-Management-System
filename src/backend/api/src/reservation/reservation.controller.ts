import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationClientEntity } from './reservation.client.entity/reservation.client.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChargeType, ReservationStatus } from '@prisma/client';
import { MomentService } from 'src/moment/moment.service';

@Controller('api/reservation')
@ApiTags('reservation')
@ApiBearerAuth('JWT-auth')
export class ReservationController {
  constructor(private moment: MomentService, private prisma: PrismaService) { }

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
    @Param('id', ParseIntPipe) id: number,
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

  @Get('arrivals/:date')
  async getArrivals(@Param("date") date: string) {
    let d: moment.Moment;
    if (date === "") {
      d = this.moment.moment().startOf('day')
    } else {
      d = this.moment.moment(date).startOf('day');
    }
    const next_day = d.clone().add(1, 'day');
    Logger.debug(`date=${this.moment.moment(date)}`)
    Logger.debug(`d=${d}`)
    Logger.debug(`next_day=${next_day}`)
    return await this.prisma.reservation.findMany({
      where: {
        checked_status: ReservationStatus.FILED,
        arrival: {
          gte: d.toDate(),
          lt: next_day.toDate(),
        },
      },
      include: {
        charge: true,
      },
    });
  }

  @Post()
  async create(@Body() reservation: ReservationClientEntity) {
    reservation.visitor = reservation.visitor
      ? Number(reservation.visitor)
      : undefined;
    reservation.arrival = new Date(reservation.arrival);
    reservation.departure = new Date(reservation.departure);
    reservation.bill = reservation.bill ? Number(reservation.bill) : undefined;
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    if (
      reservation.arrival <= yesterday ||
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
        NOT:{
          checked_status:ReservationStatus.CHECKEDOUT,
        },
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
    const { bill, reservation_id, ...rest } = reservation;
    Logger.debug(rest);
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
    reservation.visitor = reservation.visitor
      ? Number(reservation.visitor)
      : undefined;
    reservation.bill = reservation.bill ? Number(reservation.bill) : undefined;
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
