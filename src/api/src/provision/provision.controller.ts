import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProvisionEntity } from './provision.entity/provision.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

type tempType = {
  where?: {
    employee_id: number;
  };
};

@Controller('api/provision')
@ApiTags('provision')
export class ProvisionController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @ApiQuery({ name: 'employee_id', required: false })
  async getAll(@Query('employee_id', ParseIntPipe) id?: number) {
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
  async getId(@Param('id', ParseIntPipe) id: number) {
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
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.provisionOrder.delete({ where: { provision_id: id } });
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() provision: ProvisionEntity,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { provision_id, ...rest } = provision;
    return this.prisma.provisionOrder.upsert({
      create: { ...rest },
      update: { provision_id: id, ...rest },
      where: { provision_id: id },
    });
  }
}
