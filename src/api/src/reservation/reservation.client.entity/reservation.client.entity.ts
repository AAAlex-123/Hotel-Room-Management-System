import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';

export class ReservationClientEntity {
  @ApiProperty()
  reservation_id?: number;
  @ApiProperty({ default: '001' })
  room_number: string;
  @ApiProperty({ default: 1000 })
  client_id: number;
  @ApiProperty({ default: Date.now() })
  arrival: Date;
  @ApiProperty({ default: Date.now() })
  departure: Date;
  @ApiProperty({ required: false, default: 'user' })
  name?: string;
  @ApiProperty({ required: false, default: '6923531223' })
  cellphone?: string;
  @ApiProperty({ required: false, default: 'temp@mail.com' })
  email?: string;
}
