import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuEntity } from 'src/menu.entity/menu.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/menu')
export class MenuController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async getAll() {
    return await this.prisma.menuItem.findMany();
  }

  @Get(':id')
  async getItem(@Param('id') id: number) {
    return await this.prisma.menuItem.findUnique({
      where: {
        menu_id: id
      }
    })
  }

  @Post()
  async createItem(@Body() menuItem: MenuEntity) {
    return await this.prisma.menuItem.create({
      data: menuItem
    })
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() menuItem: MenuEntity) {
    const { menu_id, ...rest } = menuItem;
    await this.prisma.menuItem.upsert({
      create: rest,
      update: rest,
      where: {
        menu_id: id
      }
    })
  }
  @Delete(':id')
  async delete(@Param('id')id:number){
    await this.prisma.menuItem.delete({
      where:{
        menu_id:id
      }
    })
  }
}
