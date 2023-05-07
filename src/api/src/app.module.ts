import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';
import { EmployeeController } from './employee/employee.controller';
import { ReservationController } from './reservation/reservation.controller';
import { HousekeeperController } from './housekeeper/housekeeper.controller';
import { ChambermaidController } from './chambermaid/chambermaid.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomController, EmployeeController, ReservationController, HousekeeperController, ChambermaidController],
  providers: [PrismaService],
})
export class AppModule {}
