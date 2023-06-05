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
import { EmployeeType, Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import RoomEntity, { RoomUpdateEntity } from './room.entity/room.entity';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('api/room')
@ApiTags('room')
@ApiBearerAuth('JWT-auth')
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
    if (chambermaid_id !== undefined) {
      const emp = await this.prisma.employee.findUnique({
        where: {
          employee_id: Number(chambermaid_id),
        },
      });
      const chambermaid = emp.type === EmployeeType.CHAMBERMAID;
      return await this.prisma.room.findMany({
        where: {
          groupRoom: {
            group: chambermaid
              ? {
                  GroupChamber: {
                    some: {
                      chambermaid_id: Number(chambermaid_id),
                    },
                  },
                }
              : { housekeeper_id: Number(chambermaid_id) },
          },
        },
      });
    } else {
      return await this.prisma.room.findMany();
    }
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
  @Post('many')
  async create_rooms(@Body() room: RoomEntity[]) {
    return await this.prisma.$transaction(async (ctx) => {
      //Delete all rooms that are not in the final array
      ctx.room.deleteMany({
        where: {
          AND: [
            {
              room_id: {
                notIn: room.map((value) => value.room_id),
              },
            },
            {
              floor: {
                notIn: room.map((value) => value.floor),
              },
            },
          ],
        },
      });
      //Create or update the necessary rooms
      const array: Room[] = [];
      for (const iterator of room) {
        const { room_id, ...rest } = iterator;
        array.push(
          await this.prisma.room.upsert({
            create: iterator,
            update: { ...rest },
            where: {
              room_id,
            },
          }),
        );
      }
      return array;
    });
  }

  @Put(':room_id')
  async update_room(
    @Param('room_id') id: string,
    @Body() room: RoomUpdateEntity,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { room_id, ...rest } = room;
    return await this.prisma.room.update({
      data: { ...rest },
      where: {
        room_id: id,
      },
    });
  }

  @Delete(':number')
  @ApiParam({ name: 'number', type: String })
  async delete_room(@Param('number') id: string) {
    return await this.prisma.room.deleteMany({
      where: {
        room_id: id,
      },
    });
  }
}
