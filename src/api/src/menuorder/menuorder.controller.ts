import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuOrderEntity } from './menu.order.entity/menu.order.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
type select = {
  where?: {
    room_number: string;
  };
};
@Controller('api/menu/order')
@ApiTags('menu-order')
export class MenuorderController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @ApiQuery({
    name: 'room_number',
    type: String,
    required: false,
    description: 'Room to filter orders to',
  })
  async getAll(@Query() { room_number }: { room_number?: string }) {
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
  async getId(@Param('order_id', ParseIntPipe) id: number) {
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
  async delete(@Param('order_id', ParseIntPipe) order_id: number) {
    await this.prisma.menuOrder.delete({
      where: {
        order_id,
      },
    });
  }

  @Put(':order_id')
  async update(
    @Param('order_id', ParseIntPipe) id: number,
    @Body() order: MenuOrderEntity,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { order_id, ...rest } = order;
    await this.prisma.menuOrder.upsert({
      create: rest,
      update: order,
      where: {
        order_id: id,
      },
    });
  }
}
