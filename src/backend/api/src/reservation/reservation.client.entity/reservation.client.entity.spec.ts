import { ReservationClientEntity } from './reservation.client.entity';

describe('ReservationClientEntity', () => {
  it('should be defined', () => {
    const it = new ReservationClientEntity();
    it.room_number = '001';
    expect(it.room_number).toBeDefined();
    expect(it.room_number).toEqual('001');
  });
});
