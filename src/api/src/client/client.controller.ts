import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/client')
@ApiTags('client')
export class ClientController {
  constructor(private prisma: PrismaService) {}

  @Post('checkout')
  async checkout({ reservation_id }: { reservation_id: number }) {
    await this.prisma.room.updateMany({
      data: {
        clean_type: 'DEEP',
      },
      where: {
        Reservation: {
          every: {
            reservation_id,
          },
        },
      },
    });
  }
}
