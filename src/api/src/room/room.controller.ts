import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import RoomEntity from './room.entity/room.entity';

@Controller('api/room')
export class RoomController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async rooms(): Promise<Room[]> {
    const results = await this.prisma.room.findMany();
    return results;
  }

  @Get(':number')
  async room_by_id(@Param('number') id: string): Promise<Room> {
    return await this.prisma.room.findFirst({
      where: {
        room_number: id,
      },
    });
  }

  @Post()
  async create_room(@Body() room: RoomEntity) {
    await this.prisma.room.create({ data: room });
  }

  @Delete(':number')
  async delete_room(@Param('number') id: string) {
    await this.prisma.room.delete({
      where: {
        room_number: id,
      },
    });
  }
}
