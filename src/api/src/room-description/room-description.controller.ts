import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomDescription } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('room-description')
@ApiTags('room-description')
export class RoomDescriptionController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getAll() {
    return await this.prisma.roomDescription.findMany();
  }
  @Get(':room_id')
  async getRoom(@Param('room_id') room_id: string) {
    return await this.prisma.roomDescription.findUnique({
      where: {
        room_id,
      },
    });
  }

  @Delete(':room_id')
  async delete(@Param('room_id') room: string) {
    return await this.prisma.roomDescription.delete({
      where: {
        room_id: room,
      },
    });
  }

  @Post()
  async createRoom(@Body() dto: RoomDescription) {
    return await this.prisma.roomDescription.create({
      data: dto,
    });
  }

  @Put(':room_id')
  async putRoom(
    @Param('room_id') number: string,
    @Body() dto: RoomDescription,
  ) {
    return await this.prisma.roomDescription.upsert({
      create: { ...dto },
      update: { ...dto },
      where: {
        room_id: number,
      },
    });
  }
}
