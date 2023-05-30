import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
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
import { ApiTags } from '@nestjs/swagger';

@Controller('api/employee')
@ApiTags('employee')
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
  async getById(@Param('id', ParseIntPipe) id: number) {
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

  @Post()
  async create(@Body() employee: EmployeeEntity) {
    Logger.log(employee);
    const pepperRounds = this.config.get<number>('sale') || 10;
    const pre_hashed_code = employee.password;
    employee.password = await hash(pre_hashed_code, pepperRounds);
    Logger.log(employee);
    const employees = await this.prisma.employee.create({
      data: { ...employee },
    });
    return employees.employee_id;
  }
  @Post('many')
  async createMany(@Body() employee: EmployeeEntity[]) {
    const pepperRounds = this.config.get<number>('sale') || 10;
    employee.forEach(async (value) => {
      const pre_hashed_code = value.password;
      value.password = await hash(pre_hashed_code, pepperRounds);
    });
    Logger.log(employee);
    await this.prisma.employee.createMany({
      data: { ...employee },
    });
    return await this.prisma.employee.findMany({
      where: {
        username: {
          in: employee.map((emp) => emp.username),
        },
      },
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    Logger.log(id);
    await this.prisma.employee.delete({
      where: {
        employee_id: Number(id),
      },
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() employee: EmployeeEntity,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { employee_id, password, ...creation_field } = employee;
    const pepperRounds = this.config.get<string>('sale') || 10;
    const password_h = await hash(password, pepperRounds);
    return await this.prisma.employee.upsert({
      create: {
        employee_id: Number(id),
        password: password_h,
        ...creation_field,
      },
      update: { password: password_h, ...creation_field },
      where: {
        employee_id: Number(id),
      },
      select: {
        username: false,
        password: false,
      },
    });
  }
}
