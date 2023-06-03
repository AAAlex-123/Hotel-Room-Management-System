import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/client')
@ApiTags('client')
export class ClientController {
  constructor(private prisma: PrismaService) {}

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
            reservation_id,
          },
        },
      },
    });
  }

  @Post('checkout')
  async checkout(@Body() { reservation_id }: { reservation_id: number }) {
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
