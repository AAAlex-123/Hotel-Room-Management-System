import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientEntity } from './client.entity/client.entity';
import { Client } from '@prisma/client';

@Controller('api/client')
@ApiTags('client')
export class ClientController {
  constructor(private prisma: PrismaService) { }

  @ApiQuery({ name: 'reservation_id', type: Number, required: false })
  @Get()
  async getClients(@Query() { reservation_id }: { reservation_id?: number }) {
    return await this.prisma.client.findMany({
      where: {
        Reservation: {
          some: {
            reservation_id: Number(reservation_id),
          },
        },
      },
    });
  }
  @Get(':id')
  async getClient(@Param('id', ParseIntPipe) client_id: number) {
    return await this.prisma.client.findUnique({
      where: {
        client_id,
      },
    });
  }
  @Delete(':id')
  async deleteClient(@Param('id', ParseIntPipe) client_id: number) {
    return await this.prisma.client.delete({
      where: {
        client_id,
      },
    });
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, dto: ClientEntity) {
    const { client_id, ...rest } = dto;
    return await this.prisma.client.upsert({
      create: { ...rest },
      update: { ...rest },
      where: {
        client_id: id,
      },
    });
  }
  @Post()
  async create(dto: ClientEntity) {
    return await this.prisma.client.create({
      data: { ...dto },
    });
  }
}
