import { Controller, Get } from '@nestjs/common';


@Controller('api')
export class AppController {
  constructor() {}
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
