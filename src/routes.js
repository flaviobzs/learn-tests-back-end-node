import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello tests' }));

routes.post('/users', UserController.store);

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);

export default routes;
