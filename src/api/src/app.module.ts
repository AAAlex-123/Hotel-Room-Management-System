import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { RoomController } from './room/room.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomController],
  providers: [PrismaService],
})
export class AppModule {}
