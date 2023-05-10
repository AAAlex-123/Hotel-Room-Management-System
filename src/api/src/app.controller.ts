import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('api')
export class AppController {
  constructor(private prisma: PrismaService) {}
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
