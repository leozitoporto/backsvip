import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // Appointment | null = o retorno é do tipo Appointment ou será nulo
  public findByDate(date: Date): Appointment | null {
    // procuro um agendamento na msma data
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    // se encontrar tras ele senao retorna nulo
    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
