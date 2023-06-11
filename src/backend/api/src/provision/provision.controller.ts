import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ProvisionEntity,
  ProvisionUpdateEntity,
} from './provision.entity/provision.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';

@Controller('api/provision')
@ApiTags('provision')
@ApiBearerAuth('JWT-auth')
export class ProvisionController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @ApiQuery({ name: 'employee_id', required: false, type: Number })
  async getAll(@Query() { employee_id }: { employee_id?: number }) {
    if (employee_id !== undefined) {
      const { type } = await this.prisma.employee.findUnique({
        where: {
          employee_id: employee_id ? Number(employee_id) : undefined,
        },
        select: {
          type: true,
        },
      });
      if (type === EmployeeType.CHAMBERMAID) {
        return await this.prisma.provisionOrder.findMany({
          where: {
            employee_id: employee_id ? Number(employee_id) : undefined,
          },
        });
      } else if (type === EmployeeType.HOUSEKEEPER) {
        return await this.prisma.provisionOrder.findMany({
          where: {
            employee: {
              GroupChamber: {
                group: {
                  housekeeper_id: employee_id ? Number(employee_id) : undefined,
                },
              },
            },
          },
        });
      }
    } else {
      return await this.prisma.provisionOrder.findMany();
    }
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.prisma.provisionOrder.findUnique({
      where: {
        provision_id: id,
      },
    });
  }

  @Post()
  async create(@Body() provision: ProvisionEntity) {
    return await this.prisma.provisionOrder.create({ data: { ...provision } });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.prisma.provisionOrder.deleteMany({
      where: { provision_id: id },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() provision: ProvisionUpdateEntity,
  ) {
    const { provision_id, ...rest } = provision;
    return await this.prisma.provisionOrder.update({
      data: { ...rest },
      where: { provision_id: id },
    });
  }
}
