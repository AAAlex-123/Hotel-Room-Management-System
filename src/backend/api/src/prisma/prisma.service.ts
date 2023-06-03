import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmployeeType, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { EmployeeEntity } from 'src/employee/employee.entity/employee.entity';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private config: ConfigService) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
    const employee: EmployeeEntity = {
      name: 'wizard',
      username: 'wizard',
      password: 'wizard_random',
      type: EmployeeType.RECEPTION,
    };
    const pepperRounds = this.config.get<number>('sale') || 10;
    const pre_hashed_code = employee.password;
    employee.password = await hash(pre_hashed_code, pepperRounds);
    await this.employee.upsert({
      create: { ...employee },
      update: { ...employee },
      where: {
        username: employee.username,
      },
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
