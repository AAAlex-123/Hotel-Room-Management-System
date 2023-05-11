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
import { ProvisionEntity } from './provision.entity/provision.entity';

type tempType = {
  where?: {
    employee_id: number;
  };
};

@Controller('api/provision')
export class ProvisionController {
  constructor(private prisma: PrismaService) { }
  @Get()
  async getAll(@Query('employee_id') id?: number) {
    const temp: tempType = {};
    if (id !== undefined) {
      temp.where = { employee_id: id };
    }
    return this.prisma.provisionOrder.findMany({
      where: {
        employee_id: id,
      },
    });
  }
  @Get(':id')
  async getid(@Param('id') id: number) {
    return this.prisma.provisionOrder.findUnique({
      where: {
        provision_id: id,
      },
    });
  }

  @Post()
  async create(@Body() provision: ProvisionEntity) {
    return this.prisma.provisionOrder.create({ data: { ...provision } });
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.prisma.provisionOrder.delete({ where: { provision_id: id } });
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() provision: ProvisionEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { provision_id, ...rest } = provision;
    return this.prisma.provisionOrder.upsert({
      create: { ...rest },
      update: { ...provision },
      where: { provision_id: id },
    });
  }
}
