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
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Controller('api/employee')
export class EmployeeController {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  @Get()
  async getEmployees(): Promise<EmployeeEntityNoPass[]> {
    return await this.prisma.employee.findMany({
      select: {
        employee_id: true,
        name: true,
        username: true,
        type: true,
        password: false,
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
        password: false,
        username: false,
      },
    });
  }

  //TODO-[10/05/2023]: Hash pass words
  @Post()
  async create(@Body() employee: EmployeeEntity) {
    const pepperRounds = this.config.get<string>('sale') || 10;
    const pre_hashed_code = employee.password;
    employee.password = await hash(pre_hashed_code, pepperRounds);
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
    const { employee_id, password, ...creation_field } = employee;
    const pepperRounds = this.config.get<string>('sale') || 10;
    const password_h = await hash(password, pepperRounds);
    await this.prisma.employee.upsert({
      create: { password: password_h, ...creation_field },
      update: { password: password_h, ...creation_field },
      where: {
        employee_id: id,
      },
    });
  }
}
