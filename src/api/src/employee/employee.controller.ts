import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeEntity } from './employee.entity/employee.entity';

@Controller('api/employee')
export class EmployeeController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getEmployees(): Promise<Employee[]> {
    return await this.prisma.employee.findMany();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Employee> {
    return await this.prisma.employee.findFirst({
      where: {
        employee_id: id,
      },
    });
  }

  @Post()
  async create(@Body() employee: EmployeeEntity) {
    await this.prisma.employee.create({ data: employee });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.prisma.employee.delete({
      where: {
        employee_id: id,
      },
    });
  }

  @Put('id')
  async update(@Param('id') id: number, @Body() employee: EmployeeEntity) {
    const { employee_id, ...creation_field } = employee;
    await this.prisma.employee.upsert({
      create: { ...creation_field },
      update: { ...employee },
      where: {
        employee_id: id,
      },
    });
  }
}
