import { Router } from 'express';
import appointmentsRouter from './appointments_routes';
import usersRouter from './users_routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
