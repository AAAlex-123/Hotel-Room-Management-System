export class MenuOrderEntity {
  order_id?: number;
  menu_id: number;
  room_number: string;
  amount: number;
  complete: boolean;
  creation: Date;
}
