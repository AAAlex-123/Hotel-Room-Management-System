import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationClientEntity } from './reservation.client.entity/reservation.client.entity';
import { Client, Reservation } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/reservation')
@ApiTags('reservation')
export class ReservationController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async allReservation(
    @Query('client') client: boolean,
  ): Promise<ReservationClientEntity[]> {
    const results = await this.prisma.reservation.findMany({
      include: { client },
    });
    return client ? results.map((value) => this.fromComposite(value)) : results;
  }

  private fromComposite(
    value: Reservation & { client: Client },
  ): ReservationClientEntity {
    const clientBuffer: Client = value.client;
    const reservationBuffer: Reservation = value;
    return {
      ...reservationBuffer,
      ...clientBuffer,
    };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query('client', ParseBoolPipe) client: boolean,
  ): Promise<ReservationClientEntity> {
    const results = await this.prisma.reservation.findFirst({
      where: { reservation_id: id },
      include: { client },
    });
    return client ? this.fromComposite(results) : results;
  }

  @Post()
  async create(@Body() reservation: ReservationClientEntity) {
    await this.prisma.reservation.create({ data: reservation });
  }

  @Delete(':id')
  async deletes(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.reservation.delete({ where: { reservation_id: id } });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reservation: ReservationClientEntity,
  ) {
    await this.prisma.reservation.upsert({
      create: { ...reservation },
      update: {
        room_id: reservation.room_id,
        client_id: reservation.client_id,
        arrival: reservation.arrival,
        departure: reservation.departure,
      },
      where: {
        reservation_id: id,
      },
    });
  }
}
