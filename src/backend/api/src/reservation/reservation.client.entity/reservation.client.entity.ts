import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, isNumber, isPositive } from 'class-validator';

export class ReservationClientEntity {
  reservation_id?: number;
  @ApiProperty({ default: '1' })
  room_id: string;
  @ApiProperty({ type: Date, default: new Date() })
  arrival: Date;
  @ApiProperty({ type: Date, default: new Date() })
  departure: Date;
  @ApiProperty({ default: 'user' })
  name: string;
  @ApiProperty({ default: '699999999' })
  cellphone: string;
  @ApiProperty({ required: false, default: 'London' })
  city?: string;
  @ApiProperty({ required: false, default: 'England' })
  country?: string;
  @ApiProperty({ required: false, default: 'Hilda str.' })
  address?: string;
  @ApiProperty({ required: false, default: '12323' })
  postcode?: string;
  @ApiProperty({ required: false, default: 1 })
  visitor?: number;
  @ApiProperty({ required: false, default: 'temp@mail.com' })
  email?: string;
  bill?: number;
}
