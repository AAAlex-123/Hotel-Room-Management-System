import { ApiProperty } from '@nestjs/swagger';

export class GroupEntity {
  group_id?: number;
  @ApiProperty({ description: 'the employee id of the housekeeper' })
  housekeeper_id: number;
  @ApiProperty({ description: 'the room_numbers to be cleaned' })
  room_numbers: string[];
  @ApiProperty({
    description: 'the employee ids of the chambermaids',
    type: [Number],
  })
  chambermaid: number[];
}
