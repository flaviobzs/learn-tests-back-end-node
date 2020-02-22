import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AccountController from './app/controllers/AccountController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello tests' }));

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/accounts', AccountController.index);
routes.get('/accounts/:id', AccountController.show);
routes.post('/accounts', AccountController.store);
routes.put('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.delete);

export default routes;
