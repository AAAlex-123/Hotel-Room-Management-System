import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/employee')
@ApiTags('employee')
@ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
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
    const pepperRounds = this.config.get<number>('sale') || 10;
    const pre_hashed_code = employee.password;
    employee.password = await hash(pre_hashed_code, pepperRounds);
    const employees = await this.prisma.employee.create({
      data: { ...employee },
    });
    return employees.employee_id;
  }

  @Post('many')
  async createMany(@Body() employee: EmployeeEntity[]) {
    const pepperRounds = this.config.get<number>('sale') || 10;
    for (const iterator of employee) {
      if (iterator.password !== '***') {
        const pre_hashed_code = iterator.password;
        iterator.password = await hash(pre_hashed_code, pepperRounds);
      }
    }
    return await this.prisma.$transaction(async (ctx) => {
      ctx.employee.deleteMany({
        where: {
          username: {
            notIn: employee.map((value) => value.username),
          },
        },
      });
      //Create or update the necessary rooms
      const array: EmployeeEntityNoPass[] = [];
      for (const iterator of employee) {
        const updatePass = iterator.password === '***';
        const { employee_id, password, ...rest } = iterator;
        array.push(
          await this.prisma.employee.upsert({
            create: iterator,
            update: { password: updatePass ? undefined : password, ...rest },
            where: {
              username: iterator.username,
            },
          }),
        );
      }
      return await this.prisma.employee.findMany({
        where: {
          username: {
            in: employee.map((emp) => emp.username),
          },
        },
      });
    });
  }

  @Delete(':id')
  async deletes(@Param('id', ParseIntPipe) id: number) {
    return await this.prisma.employee.deleteMany({
      where: {
        employee_id: id,
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
