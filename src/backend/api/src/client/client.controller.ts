import { BadRequestException, Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChargeType, ReservationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/client')
@ApiBearerAuth('JWT-auth')
@ApiTags('client')
export class ClientController {
  constructor(private prisma: PrismaService) { }

  @Post('absence')
  async absence(
    @Body()
    { reservation_id, state }: { reservation_id: number; state: boolean },
  ) {
    return await this.prisma.room.updateMany({
      data: {
        cleanable: state,
      },
      where: {
        Reservation: {
          some: {
            reservation_id: Number(reservation_id),
          },
        },
      },
    });
  }

  @Post('checkout')
  async checkout(@Body() { reservation_id }: { reservation_id: number }) {
    const id = Number(reservation_id)
    this.prisma.$transaction(async (ctx) => {
      await ctx.room.updateMany({
        data: {
          clean_type: 'DEEP',
          occupied: false,
          cleanable: true,
        },
        where: {
          Reservation: {
            every: {
              reservation_id: id,
            },
          },
        },
      });
      const charges = await ctx.charge.findMany({
        where: {
          reservation_id: id,
        },
      });
      const total = charges
        .map(
          (value) => (value.type === ChargeType.CHARGE ? 1 : -1) * value.amount,
        )
        .reduce((prev, curr) => prev + curr);
      if (total > 0) {
        await this.prisma.charge.create({
          data: {
            amount: total,
            type: ChargeType.CREDIT,
            description: 'Closer',
            reservation_id: id,
          },
        });
      }
      await ctx.reservation.update({
        data: {
          checked_status: ReservationStatus.CHECKEDOUT,
          departure: new Date()
        },
        where: {
          reservation_id: id,
        },
      })
    });
  }
  @Post('checkin')
  async checkin(@Body() { reservation_id }: { reservation_id: number }) {
    this.prisma.$transaction([
      this.prisma.room.updateMany({
        data: {
          occupied: true,
          cleanable: false,
        },
        where: {
          Reservation: {
            every: {
              reservation_id,
            },
          },
        },
      }),
      this.prisma.reservation.update({
        data: {
          checked_status: ReservationStatus.CHECKEDIN,
        },
        where: {
          reservation_id,
        },
      }),
    ])
  }
  @Get('check/:id')
  async checkCheckout(@Param('id', ParseIntPipe) id: number) {
    const reservation_id = Number(id)
    const charges = await this.prisma.charge.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: ChargeType.CHARGE,
        reservation_id,
      }
    })
    const credits = await this.prisma.charge.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: ChargeType.CREDIT,
        reservation_id
      }
    })
    if (charges._sum.amount === null || credits._sum.amount === null) throw new BadRequestException()
    return { total: charges._sum.amount - credits._sum.amount }
  }
}

