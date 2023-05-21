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
  @Get(':room_number')
  async getRoom(@Param('room_number') room_number: string) {
    return await this.prisma.roomDescription.findUnique({
      where: {
        room_number,
      },
    });
  }

  @Delete(':room_number')
  async delete(@Param('room_number') room: string) {
    return await this.prisma.roomDescription.delete({
      where: {
        room_number: room,
      },
    });
  }

  @Post()
  async createRoom(@Body() dto: RoomDescription) {
    return await this.prisma.roomDescription.create({
      data: dto,
    });
  }

  @Put(':room_number')
  async putRoom(
    @Param('room_number') number: string,
    @Body() dto: RoomDescription,
  ) {
    return await this.prisma.roomDescription.upsert({
      create: { ...dto },
      update: { ...dto },
      where: {
        room_number: number,
      },
    });
  }
}
