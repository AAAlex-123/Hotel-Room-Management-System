import { Client, Reservation } from '@prisma/client';

export class ReservationClientEntity implements Reservation {
  name?: string;
  cellphone?: string;
  email?: string;
  reservation_id: number;
  room_number: string;
  client_id: number;
  has_paid: boolean;
  arrival: Date;
  departure: Date;
}
