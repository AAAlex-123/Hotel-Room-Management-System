import { ApiProperty } from '@nestjs/swagger';

export class MenuEntity {
  menu_id?: number;
  @ApiProperty({
    required: true,
    default: 'food',
    description: 'The food entry description',
  })
  name: string;
  @ApiProperty({
    required: true,
    default: 1.0,
    description: 'The food entry price',
  })
  price: number;
  @ApiProperty({
    required: true,
    default: false,
    description: 'The food entry availability ',
  })
  availability: boolean;
}
