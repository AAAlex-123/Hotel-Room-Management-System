import { ApiProperty } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';

export class EmployeeEntity {
  employee_id?: number;
  @ApiProperty({
    default: EmployeeType.HOUSEKEEPER,
    enum: [EmployeeType.HOUSEKEEPER, EmployeeType.CHAIMBERMAID],
  })
  type: EmployeeType;
  @ApiProperty({ default: 'user full name' })
  name: string;
  @ApiProperty({ default: 'password' })
  password: string;
  @ApiProperty({ default: 'username' })
  username: string;
}
export class EmployeeEntityNoPass {
  employee_id?: number;
  @ApiProperty({
    enum: EmployeeType,
    default: EmployeeType.HOUSEKEEPER,
  })
  type: EmployeeType;
  @ApiProperty({ default: 'user full name' })
  name: string;
}
