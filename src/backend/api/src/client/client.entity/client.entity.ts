import { ApiProperty } from '@nestjs/swagger';

export class ClientEntity {
  client_id?: number;
  @ApiProperty({ default: 'username' })
  name: string;
  @ApiProperty({ default: '6900000000' })
  cellphone: string;
  @ApiProperty({ default: 'example@mail.com' })
  email: string;
}
