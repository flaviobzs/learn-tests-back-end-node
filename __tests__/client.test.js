import request from 'supertest';
import app from '../src/app';

import factory from './factories/ClientFactory';

test('Should list all users', async () => {
  const response = await request(app).get('/clients');

  // expect(response.body).toHaveLength(1);
  // expect(response.body[0]).toHaveProperty('name', 'John Doe');
  expect(response.status).toBe(200);

  // expect(client.length).toBeGreaterThan(0);
});

test('Should create a new user', async () => {
  const client = await factory.attrs('Client', {
    name: 'John Doe',
  });

  const response = await request(app)
    .post('/clients')
    .send(client);

  expect(response.status).toBe(201);
  expect(response.body.name).toBe('John Doe');
});
