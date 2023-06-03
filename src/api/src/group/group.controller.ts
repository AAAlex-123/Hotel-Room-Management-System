import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Post } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroopRooms, GroupChamber } from '@prisma/client';
import { GroupEntity } from 'src/group/group.entity/group.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/group')
@ApiTags('group')
export class GroupController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll() {
    return await this.prisma.group.findMany({
      include: {
        groupRooms: true,
        GroupChamber: true,
      },
    });
  }

  @Get(':employee_id')
  async getID(@Param('employee_id', ParseIntPipe) id: number) {
    return await this.prisma.group.findMany({
      where: {
        housekeeper_id: id,
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
  async deleteById(@Param('id', ParseIntPipe) id: number) {
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
