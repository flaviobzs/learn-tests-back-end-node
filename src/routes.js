import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Flávio Lindoooo' }));

export default routes;
