import { ApiProperty } from '@nestjs/swagger';

export class NoteEntity {
  note_id?: number;
  @ApiProperty({ default: 1, description: 'The employee id of the creator' })
  employee_id: number;
  @ApiProperty({ default: 'text', description: 'The content of the note' })
  content: string;
  created: Date;
  @ApiProperty({ default: '001', description: 'The room the note concerns' })
  room_number: string;
  @ApiProperty({
    default: false,
    description:
      'A boolean mask about whether the issue documented was resolved',
  })
  completed: boolean;
}
