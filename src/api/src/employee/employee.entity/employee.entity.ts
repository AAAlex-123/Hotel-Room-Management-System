import { ApiProperty } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';

export class EmployeeEntity {
  @ApiProperty()
  employee_id?: number;
  @ApiProperty()
  type: EmployeeType;
  @ApiProperty()
  login: string;
  @ApiProperty()
  login_name: string;
}
