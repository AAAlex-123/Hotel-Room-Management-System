import { ApiProperty } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';

export class EmployeeEntity {
  @ApiProperty({ required: false })
  employee_id?: number;
  @ApiProperty({ default: EmployeeType.HOUSEKEEPER })
  type: EmployeeType;
  @ApiProperty()
  name: string;
  @ApiProperty({ default: 'password' })
  password: string;
  @ApiProperty({ default: 'username' })
  username: string;
}
export class EmployeeEntityNoPass {
  @ApiProperty({ required: false })
  employee_id?: number;
  @ApiProperty({ default: EmployeeType.HOUSEKEEPER })
  type: EmployeeType;
  @ApiProperty()
  name: string;
}
