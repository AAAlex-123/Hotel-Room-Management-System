import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChargeType } from '@prisma/client';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

class ChargeEntity {
  @ApiProperty({
    type: Number,
    description: 'The id of the reservation',
    default: 1,
  })
  reservation_id: number;
  timestamp?: Date;
  @ApiProperty({
    type: Number,
    description: 'The description of the reservation',
    default: 'charge',
  })
  description: string;
  @ApiProperty({
    type: Number,
    description: 'The price of the reservation',
    default: 50,
  })
  amount: number;
  @ApiProperty({
    type: Number,
    description: 'The type of the reservation',
    default: ChargeType.CHARGE,
  })
  type: ChargeType;
}

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
        reservation_id,
      },
    });
  }
  @Post()
  async create(@Body() charge: ChargeEntity) {
    return await this.prisma.charge.create({
      data: charge,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Query('type') type?: ChargeType) {
    const way: ByType = { where: { reservation_id: id } };
    if (type === undefined) way.where.chargeType = type;
    return await this.prisma.charge.findMany(way);
  }

  //TODO-[16/05/2023]: It's a feature
  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   await this.prisma.charge.deleteMany({
  //     where: {
  //       reservation_id: id,
  //     },
  //   });
  // }

  //TODO-[16/05/2023]: Add an cancel function
}
