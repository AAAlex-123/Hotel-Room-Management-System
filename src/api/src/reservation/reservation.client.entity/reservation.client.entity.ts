import { ApiProperty } from '@nestjs/swagger';

export class ReservationClientEntity {
  reservation_id?: number;
  @ApiProperty({ default: '001' })
  room_id: string;
  @ApiProperty({ default: Date.now() })
  arrival: Date;
  @ApiProperty({ default: Date.now() })
  departure: Date;
  @ApiProperty({ default: 'user' })
  name: string;
  @ApiProperty({ default: '6923531223' })
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
}
