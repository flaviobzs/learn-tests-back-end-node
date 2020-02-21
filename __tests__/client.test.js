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
  // const client = await factory.attrs('Client');

  const response = await request(app)
    .post('/clients')
    .send({
      name: 'Jode',
    });

  expect(response.status).toBe(201);
  // expect(response.body.name).toBe('John Doe');
});

test('Should not create a new user without atribute name', async () => {
  const response = await request(app)
    .post('/clients')
    .send({
      mail: 'john@gmail.com',
      password: '123456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Name is obrigatory');
});

test('Should not create a new user without atribute mail', async () => {
  const response = await request(app)
    .post('/clients')
    .send({
      name: 'john',
      password: '123456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Mail is obrigatory');
});

test('Should not create a new user without atribute password', async () => {
  const response = await request(app)
    .post('/clients')
    .send({
      name: 'john',
      mail: 'john@gmail.com',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Password is obrigatory');
});

test('should not be able to register with duplicated email', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      email: 'bzsflavio@gmail.com',
      password: '123456',
    });

  const response = await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      email: 'bzsflavio@gmail.com',
      password: '123456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Duplicated email, user already exists.');
});
