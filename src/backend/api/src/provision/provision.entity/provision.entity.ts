import { ApiProperty } from '@nestjs/swagger';
export class ProvisionEntity {
  provision_id?: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  employee_id: number;
  complete?: boolean;
  creation?: Date;
}

export class ProvisionUpdateEntity {
  provision_id?: number;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  employee_id?: number;
  @ApiProperty()
  complete?: boolean;
  @ApiProperty()
  creation?: Date;
}
