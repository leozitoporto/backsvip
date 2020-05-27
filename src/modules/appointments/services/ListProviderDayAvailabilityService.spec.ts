// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmetsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmetsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmetsRepository,
    );
  });

  it('permite mostrar os dias disponiveis dos provedores de serviços', async () => {
    await fakeAppointmetsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmetsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 8, available: false },
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: true },
      ]),
    );
  });
});
