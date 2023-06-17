import { ConsoleLogger, Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';
import { EmployeeController } from './employee/employee.controller';
import { ReservationController } from './reservation/reservation.controller';
import { AuthModule } from './auth/auth.module';
import { ProvisionController } from './provision/provision.controller';
import { ConfigModule } from '@nestjs/config';
import { MenuorderController } from './menuorder/menuorder.controller';
import { MenuController } from './menu/menu.controller';
import { ChargeController } from './charge/charge.controller';
import { NoteController } from './note/note.controller';
import { GroupController } from './group/group.controller';
import { ChambermaidController } from './chambermaid/chambermaid.controller';
import { ClientController } from './client/client.controller';
import { DirtyServiceService } from './dirty-service/dirty-service.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard/auth.guard';
import { MomentService } from './moment/moment.service';
import { StatisticsController } from './statistics/statistics.controller';
import moment from 'moment';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [
    AppController,
    RoomController,
    EmployeeController,
    ReservationController,
    ProvisionController,
    MenuorderController,
    MenuController,
    ChargeController,
    NoteController,
    GroupController,
    ChambermaidController,
    ClientController,
    StatisticsController,
  ],
  providers: [
    PrismaService,
    ConsoleLogger,
    DirtyServiceService,
    MomentService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MomentService,
  ],
})
export class AppModule {}
