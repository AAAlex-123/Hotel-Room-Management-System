import { ApiProperty } from '@nestjs/swagger';

export class NoteEntity {
  note_id?: number;
  @ApiProperty({ default: 1, description: 'The employee id of the creator' })
  cleaning_staff_id: number;
  @ApiProperty({ default: 'text', description: 'The content of the note' })
  note_data: string;
  created?: Date;
  @ApiProperty({ default: '1', description: 'The room the note concerns' })
  room_id: string;
}
