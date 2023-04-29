import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('room')
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
  async create_room(@Body() room: Room): Promise<boolean> {
    await this.prisma.room.create({ data: room });
    return true;
  }
}
