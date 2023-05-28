import { ConsoleLogger, Module } from '@nestjs/common';
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
import { HousekeeperController } from './housekeeper/housekeeper.controller';
import { ClientController } from './client/client.controller';

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
    HousekeeperController,
    ClientController,
  ],
  providers: [
    PrismaService,
    ConsoleLogger,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
