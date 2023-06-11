import { ApiProperty } from '@nestjs/swagger';

export class MenuOrderEntity {
  order_id?: number;
  @ApiProperty({ required: true, default: 1, description: 'Order Item' })
  menu_id: number;
  @ApiProperty({
    required: true,
    default: '1',
    description: 'Order Destination Room',
  })
  room_id: string;
  @ApiProperty({ required: true, default: 1, description: 'Order Amount' })
  amount: number;
  @ApiProperty({
    required: true,
    default: false,
    description: 'Order Completion Status',
  })
  complete: boolean;
  creation: Date;
}
