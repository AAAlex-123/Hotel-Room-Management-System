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
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuEntity } from './menu.entity/menu.entity';

@Controller('api/menu')
@ApiTags('menu')
export class MenuController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll() {
    return await this.prisma.menuItem.findMany();
  }

  @Get(':id')
  async getItem(@Param('id') id: number) {
    return await this.prisma.menuItem.findUnique({
      where: {
        menu_id: id,
      },
    });
  }

  @Post()
  async createItem(@Body() menuItem: MenuEntity) {
    return await this.prisma.menuItem.create({
      data: menuItem,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() menuItem: MenuEntity,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { menu_id, ...rest } = menuItem;
    await this.prisma.menuItem.upsert({
      create: rest,
      update: rest,
      where: {
        menu_id: id,
      },
    });
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.prisma.menuItem.deleteMany({
      where: {
        menu_id: id,
      },
    });
  }
}
