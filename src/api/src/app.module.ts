import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';
import { EmployeeController } from './employee/employee.controller';
import { ReservationController } from './reservation/reservation.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    RoomController,
    EmployeeController,
    ReservationController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
