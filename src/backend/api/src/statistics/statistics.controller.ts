import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ChargeType, Status } from '@prisma/client';
import { MomentService } from 'src/moment/moment.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/statistics')
@ApiBearerAuth('JWT-auth')
export class StatisticsController {
  constructor(private prisma: PrismaService, private moment: MomentService) { }
  @Get()
  async CalcStatistics() {
    const today = this.moment.moment().startOf('day');
    const tomorrow = today.clone().add(1, 'day')
    const arivals = await this.prisma.reservation.count({
      where: {
        arrival: {
          gte: today.toDate(),
          lt: tomorrow.toDate(),
        }
      }
    })

    const departures = await this.prisma.reservation.count({
      where: {
        departure: {
          gte: today.toDate(),
          lt: tomorrow.toDate(),
        }
      }
    })
    const inhouse = await this.prisma.reservation.count({
      where: {
        arrival: {
          gte: today.toDate(),
        },
        departure: {
          lt: tomorrow.toDate(),
        }
      }
    });
    const revenue = await this.prisma.charge.findMany({
      where: {
        timestamp: {
          gte: today.toDate(),
          lt: tomorrow.toDate(),
        },
        type: ChargeType.CREDIT,
      },
      select: {
        amount: true,
      }
    })
    const revs=revenue.length===0?0:revenue.map(value=>value.amount).reduce((prev,curr)=>prev+curr)
    const room_num = await this.prisma.room.count({
      where: {
        out_of_order: false,
        service: true,
      }
    })
    const occupied = await this.prisma.room.count({
      where: {
        OR: [
          { occupied: true },
          {
            occupied: false,
            Reservation: {
              some: {
                departure: {
                  gte: today.toDate(),
                  lt: tomorrow.toDate()
                }
              }
            }
          }
        ]
      }
    })
    const available = await this.prisma.room.count({
      where: {
        occupied: false,
        clean_state: Status.CLEAN,
      }
    })
    return { arivals, departures, inhouse, occupied, perc_occupied: 100 * occupied / room_num, revenue:revs, available };
  }
}
