import { ApiProperty } from '@nestjs/swagger';
import { Status, Type } from '@prisma/client';

export default class RoomEntity {
  @ApiProperty({ default: '001' })
  room_id: string;
  @ApiProperty({ required: false, default: true })
  occupied?: boolean;
  @ApiProperty({ required: false, default: Status.DIRTY })
  cleaning_state?: Status;
  @ApiProperty({ required: false, default: false })
  service?: boolean;
  @ApiProperty({ required: false, default: false })
  out_of_order?: boolean;
  @ApiProperty({ required: false, default: Type.DAILY })
  clean_type: Type;
  @ApiProperty({ required: false, default: '' })
  roomType: string;
  @ApiProperty({ required: false, default: '' })
  roomClass: string;
  @ApiProperty({ required: false, default: 0 })
  floor: number;
}

export class RoomUpdateEntity {
  @ApiProperty({ default: '001' })
  room_id: string;
  @ApiProperty({ required: false, default: true })
  occupied?: boolean;
  @ApiProperty({ required: false, default: Status.DIRTY })
  cleaning_state?: Status;
  @ApiProperty({ required: false, default: false })
  service?: boolean;
  @ApiProperty({ required: false, default: false })
  out_of_order?: boolean;
  @ApiProperty({ required: false, default: Type.DAILY })
  clean_type?: Type;
  @ApiProperty({ required: false, default: '' })
  roomType?: string;
  @ApiProperty({ required: false, default: '' })
  roomClass?: string;
  @ApiProperty({ required: false, default: 0 })
  floor?: number;
}
