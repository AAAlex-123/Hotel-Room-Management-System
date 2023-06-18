import { Controller, Get, Param } from '@nestjs/common';
import { Body, Delete, Post } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroopRooms, GroupChamber } from '@prisma/client';
import { GroupEntity } from 'src/group/group.entity/group.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/group')
@ApiBearerAuth('JWT-auth')
@ApiTags('group')
export class GroupController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async getAll() {
    return await this.prisma.group.findMany({
      include: {
        groupRooms: true,
        GroupChamber: {
          include: {
            chambermaid: true,
          },
        },
      },
    });
  }

  @Get('room')
  async getRooms() {
    const room_id = await this.prisma.groopRooms.findMany({
      select: {
        room_id: true
      }
    })
    const blacklist = room_id.flatMap(value => value.room_id)
    return await this.prisma.room.findMany({
      where: {
        room_id: {
          notIn: blacklist
        }
      }
    })
  }

  @Get('employee')
  async getEmployee() {
    const group_housekeeper = (await this.prisma.group.findMany({
      select: {
        housekeeper_id: true,
      }
    })).flatMap(value => value.housekeeper_id);
    const group_chamber = (await this.prisma.groupChamber.findMany({
      select: {
        chambermaid_id: true,
      }
    })).flatMap(value => value.chambermaid_id)
    const blacklist = [...group_housekeeper, ...group_chamber]
    return await this.prisma.employee.findMany({
      where: {
        employee_id: {
          notIn: blacklist
        }
      }
    });
  }

  @Get(':employee_id')
  async getID(@Param('employee_id') id: number) {
    return await this.prisma.group.findMany({
      where: {
        housekeeper_id: id,
      },
      include: {
        groupRooms: true,
        GroupChamber: {
          include: {
            chambermaid: true,
          },
        },
      },
    });
  }
  @Post()
  async createGroup(@Body() group: GroupEntity) {
    return await this.prisma.$transaction(async (ctx) => {
      const result = await this.prisma.group.create({
        data: {
          housekeeper_id: group.housekeeper_id,
        },
      });
      await this.prisma.groopRooms.createMany({
        data: group.room_numbers.map(
          (value) =>
            ({ group_id: result.group_id, room_id: value } as GroopRooms),
        ),
      });
      await this.prisma.groupChamber.createMany({
        data: group.chambermaid.map(
          (value) =>
          ({
            group_id: result.group_id,
            chambermaid_id: value,
          } as GroupChamber),
        ),
      });
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.prisma.group.delete({
      where: {
        group_id: id,
      },
    });
  }

  @Delete()
  async deleteAll() {
    await this.prisma.group.deleteMany();
  }
}
