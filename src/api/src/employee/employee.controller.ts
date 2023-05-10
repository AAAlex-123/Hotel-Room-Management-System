import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  EmployeeEntity,
  EmployeeEntityNoPass,
} from './employee.entity/employee.entity';

@Controller('api/employee')
export class EmployeeController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getEmployees(): Promise<EmployeeEntityNoPass[]> {
    return await this.prisma.employee.findMany({
      select: {
        employee_id: true,
        name: true,
        username: true,
        type: true,
        pass: false,
      },
    });
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<EmployeeEntityNoPass> {
    return await this.prisma.employee.findFirst({
      where: {
        employee_id: id,
      },
      select: {
        employee_id: true,
        name: true,
        type: true,
        pass: false,
        username: false,
      },
    });
  }

  //TODO-[10/05/2023]: Hash pass words
  @Post()
  async create(@Body() employee: EmployeeEntity) {
    const employees = await this.prisma.employee.create({
      data: { ...employee },
    });
    return employees.employee_id;
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
      update: { ...creation_field },
      where: {
        employee_id: id,
      },
    });
  }
}
