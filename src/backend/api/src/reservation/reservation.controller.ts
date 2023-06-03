import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationClientEntity } from './reservation.client.entity/reservation.client.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  async getById(@Param('id', ParseIntPipe) id: number) {
    const results = await this.prisma.reservation.findFirst({
      where: { reservation_id: id },
    });
    return results;
  }

  @Post()
  async create(@Body() reservation: ReservationClientEntity) {
    return await this.prisma.reservation.create({ data: reservation });
  }

  @Delete(':id')
  async deletes(@Param('id', ParseIntPipe) id: number) {
    return await this.prisma.reservation.deleteMany({
      where: { reservation_id: id },
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
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
