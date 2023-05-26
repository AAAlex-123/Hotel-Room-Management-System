import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/chambermaid')
@ApiTags('chambermaid')
export class ChambermaidController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiQuery({ name: 'cleaning_staff_id', required: false, type: Number })
  async getAll(@Query() args: { cleaning_staff_id?: number }) {
    return await this.prisma.employee.findMany({
      where: {
        GroupChamber: {
          group: {
            housekeeper_id: Number(args.cleaning_staff_id),
          },
        },
      },
    });
  }
}
