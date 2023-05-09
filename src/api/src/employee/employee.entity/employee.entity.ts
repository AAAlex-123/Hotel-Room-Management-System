import { ApiProperty } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';

export class EmployeeEntity {
  @ApiProperty({ required: false })
  employee_id?: number;
  @ApiProperty({ default: EmployeeType.HOUSEKEEPER })
  type: EmployeeType;
  @ApiProperty({ default: 'password' })
  login: string;
  @ApiProperty({ default: 'username' })
  login_name: string;
}
