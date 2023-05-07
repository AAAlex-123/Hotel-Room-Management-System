import { ApiProperty } from '@nestjs/swagger';
import { Room, Status, Type } from '@prisma/client';

export default class RoomEntity{
  group_id: number;
  @ApiProperty()
  room_number: string;
  @ApiProperty({ required: false, default: true })
  occupied?: boolean;
  @ApiProperty({ required: false, default: Status.DIRTY })
  cleaning_status?: Status;
  @ApiProperty({ required: false, default: false })
  service?: boolean;
  @ApiProperty({ required: false, default: false })
  out_of_order?: boolean;
  @ApiProperty({ required: false, default: Type.DAILY })
  clean_type: Type;
}
