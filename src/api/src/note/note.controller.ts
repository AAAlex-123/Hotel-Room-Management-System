import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteEntity } from './note.entity/note.entity';

@Controller('api/note')
@ApiTags('note')
export class NoteController {
  constructor(private prisma: PrismaService, private logger: ConsoleLogger) {}
  @Get()
  @ApiQuery({ name: 'room_id', required: false, type: String })
  @ApiQuery({ name: 'cleaning_staff_id', required: false, type: Number })
  async getAll(
    @Query()
    {
      room_id,
      cleaning_staff_id,
    }: {
      room_id?: string;
      cleaning_staff_id?: number;
    },
  ) {
    return await this.prisma.note.findMany({
      where: { room_id, cleaning_staff_id: Number(cleaning_staff_id) },
    });
  }
  @Get(':id')
  async getId(@Param(':id', ParseIntPipe) id: number) {
    return await this.prisma.note.findUnique({
      where: {
        note_id: id,
      },
    });
  }

  @Post()
  async create(@Body() dto: NoteEntity) {
    return await this.prisma.note.create({
      data: { ...dto },
    });
  }

  @Delete(':id')
  async deleteAll(@Param('id', ParseIntPipe) id: number) {
    return await this.prisma.note.delete({
      where: {
        note_id: id,
      },
    });
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, dto: NoteEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { note_id, ...rest } = dto;
    await this.prisma.note.upsert({
      create: { ...rest },
      update: { note_id: id, ...rest },
      where: {
        note_id: id,
      },
    });
  }
}
