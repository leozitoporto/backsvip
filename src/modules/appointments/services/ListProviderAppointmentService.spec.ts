// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';

let fakeAppointmetsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmetsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentService(
      fakeAppointmetsRepository,
      fakeCacheProvider,
    );
  });

  it('permite mostrar  a lista de agendamentos de um dia especifico', async () => {
    const appointment1 = await fakeAppointmetsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmetsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
