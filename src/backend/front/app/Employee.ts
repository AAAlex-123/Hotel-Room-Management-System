type EmployeeType = "HOUSEKEEPER" | "CHAMBERMAID" | "KITCHEN" | "RECEPTION"

export type EmployeeEntityNoPass = {
  employee_id?: number;
  type: EmployeeType;
  name: string;
}
