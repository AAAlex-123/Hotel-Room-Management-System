import { ReservationClientEntity } from './reservation.client.entity';

describe('ReservationClientEntity', () => {
  it('should be defined', () => {
    const it = new ReservationClientEntity();
    it.room_id = '001';
    expect(it.room_id).toBeDefined();
    expect(it.room_id).toEqual('001');
  });
});
