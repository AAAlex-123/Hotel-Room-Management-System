import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
type select = {
  where?: {
    room_number: string;
  };
};
@Controller('api/menu/order')
export class MenuorderController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getAll(@Query('room_number') room_number?: string) {
    const o: select =
      room_number === undefined
        ? {}
        : {
            where: {
              room_number,
            },
          };
    return await this.prisma.menuOrder.findMany(o);
  }

  @Get(':order_id')
  async getId(@Param('id') id: number) {
    return await this.prisma.menuOrder.findUnique({
      where: {
        order_id: id,
      },
    });
  }

  @Post()
  async create(@Body() order: MenuOrderEntity) {
    await this.prisma.menuOrder.create({
      data: order,
    });
  }

  @Delete(':order_id')
  async delete(@Param('order_id') order_id: number) {
    await this.prisma.menuOrder.delete({
      where: {
        order_id,
      },
    });
  }

  @Put(':order_id')
  async update(
    @Param('order_id') order_id: number,
    @Body() order: MenuOrderEntity,
  ) {
    const { order_id, rest } = order;
    await this.prisma.menuOrder.upsert({
      create: rest,
      update: order,
      where: {
        order_id,
      },
    });
  }
}
