import { Router } from 'express';
import appointmentsRouter from './appointments_routes';
import usersRouter from './users_routes';
import sessionsRouter from './sessions_routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
