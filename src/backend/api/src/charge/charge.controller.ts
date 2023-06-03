import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Charge, ChargeType } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

type ByType = {
  where: {
    reservation_id: number;
    chargeType?: ChargeType;
  };
};
@Controller('api/charge')
@ApiBearerAuth('JWT-auth')
@ApiTags('charge')
export class ChargeController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @ApiQuery({ name: 'reservation_id', type: Number, required: false })
  async getAll(@Query() { reservation_id }: { reservation_id?: number }) {
    return await this.prisma.charge.findMany({
      where: {
        reservation_id: Number(reservation_id),
      },
    });
  }
  @Post()
  async create(@Body() charge: Charge) {
    return await this.prisma.charge.create({
      data: charge,
    });
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type?: ChargeType,
  ) {
    const way: ByType = { where: { reservation_id: id } };
    if (type === undefined) way.where.chargeType = type;
    return await this.prisma.charge.findMany(way);
  }

  //TODO-[16/05/2023]: It's a feature
  // @Delete(':id')
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //   await this.prisma.charge.deleteMany({
  //     where: {
  //       reservation_id: id,
  //     },
  //   });
  // }

  //TODO-[16/05/2023]: Add an cancel function
}
