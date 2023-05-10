import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';
import { EmployeeController } from './employee/employee.controller';
import { ReservationController } from './reservation/reservation.controller';
import { AuthModule } from './auth/auth.module';
import { ProvisionController } from './provision/provision.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    RoomController,
    EmployeeController,
    ReservationController,
    ProvisionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
