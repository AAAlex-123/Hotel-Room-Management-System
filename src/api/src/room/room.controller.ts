import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import RoomEntity from './room.entity/room.entity';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('api/room')
@ApiTags('room')
export class RoomController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiQuery({
    name: 'chambermaid_id',
    description:
      'The employee id of the chambermaid tha is in the group this room is assigned to.',
    required: false,
  })
  async rooms(@Query() { chambermaid_id }: { chambermaid_id?: number }) {
    return await this.prisma.room.findMany({
      where: {
        groupRoom: {
          group: {
            GroupChamber: {
              some: {
                chambermaid_id: chambermaid_id
                  ? Number(chambermaid_id)
                  : undefined,
              },
            },
          },
        },
      },
    });
  }

  @Get(':number')
  @ApiParam({ name: 'number', type: String })
  async room_by_id(@Param('number') id: string): Promise<Room> {
    return await this.prisma.room.findFirst({
      where: {
        room_id: id,
      },
    });
  }

  @Post()
  async create_room(@Body() room: RoomEntity) {
    await this.prisma.room.create({ data: room });
  }

  @Put(':room_id')
  async update_room(@Param('room_id') id: string, @Body() room: RoomEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { room_id, ...rest } = room;
    await this.prisma.room.upsert({
      create: { room_id: id, ...rest },
      update: { ...rest },
      where: {
        room_id: id,
      },
    });
  }

  @Delete(':number')
  @ApiParam({ name: 'number', type: String })
  async delete_room(@Param('number') id: string) {
    await this.prisma.room.delete({
      where: {
        room_id: id,
      },
    });
  }
}
