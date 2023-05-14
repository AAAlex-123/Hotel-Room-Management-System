import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';
import { EmployeeController } from './employee/employee.controller';
import { ReservationController } from './reservation/reservation.controller';
import { AuthModule } from './auth/auth.module';
import { ProvisionController } from './provision/provision.controller';
import { ConfigModule } from '@nestjs/config';
import { SetMetadata } from '@nestjs/common';
import { MenuorderController } from './menuorder/menuorder.controller';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [
    AppController,
    RoomController,
    EmployeeController,
    ReservationController,
    MenuOrderController,
    ProvisionController,
    MenuorderController,
  ],
  providers: [PrismaService],
})
export class AppModule { }
