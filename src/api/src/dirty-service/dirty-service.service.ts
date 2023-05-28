import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DirtyServiceService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async makeDirty() {
    await this.prisma.room.updateMany({
      data: {
        cleaning_state: 'DIRTY',
      },
    });
  }
}
