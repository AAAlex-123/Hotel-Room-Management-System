import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Charge, ChargeType } from '@prisma/client';

type ByType = {
  where: {
    reservation_id: number;
    chargeType?: ChargeType;
  };
};
@Controller('api/charge')
export class ChargeController {
  constructor(private prisma: PrismaService) { }
  @Get()
  async getAll() {
    return await this.prisma.charge.findMany();
  }
  @Post()
  async create(@Body() charge: Charge) {
    return await this.prisma.charge.create({
      data: charge
    })
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Query('type') type?: ChargeType) {
    const way: ByType = { where: { reservation_id: id } };
    if (type === undefined) way.where.chargeType = type;
    return await this.prisma.charge.findMany(way);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.prisma.charge.deleteMany({
      where: {
        reservation_id: id
      }
    })
  }
}
