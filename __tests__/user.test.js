import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../src/app';

import User from '../src/app/models/User';

import factory from './factories/UserFactory';

test('Should list all users', async () => {
  const response = await request(app).get('/users');

  // expect(response.body).toHaveLength(1);
  // expect(response.body[0]).toHaveProperty('name', 'John Doe');
  expect(response.status).toBe(200);

  // expect(client.length).toBeGreaterThan(0);
});

test('Should create a new user', async () => {
  const user = await factory.attrs('User', {
    name: 'JohnDoe',
  });

  const response = await request(app)
    .post('/users')
    .send(user);

  expect(response.status).toBe(201);
  expect(response.body.name).toBe('JohnDoe');
  expect(response.body).not.toHaveProperty('password');
});

test('Should has a password crypted when created a new user', async () => {
  const user1 = await factory.attrs('User', {
    password: await bcrypt.hash('123456', 8),
  });

  const compareHash = await bcrypt.compare('123456', user1.password);

  expect(compareHash).toBe(true);

  const user2 = await factory.attrs('User', {
    password: '123456',
    mail: `2${user1.mail}`,
  });

  const response = await request(app)
    .post('/users')
    .send(user2);

  const { id } = response.body;

  const userCompare = await User.findByPk(id);

  expect(userCompare.password).not.toBeUndefined();
  expect(response.body.name).not.toBe('123456');
});

test('Should not create a new user without atribute name', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      mail: 'johcvn@gmail.com',
      password: '123xcv456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Name is obrigatory');
});

test('Should not create a new user without atribute mail', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'johvcxn',
      password: '123xcv456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Mail is obrigatory');
});

test('Should not create a new user without atribute password', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'john',
      mail: 'johxcvcvxcn@gmail.com',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Password is obrigatory');
});

test('should not be able to register with duplicated email', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      mail: 'bzsflaaavio@gmail.com',
      password: '123456',
    });

  const response = await request(app)
    .post('/users')
    .send({
      name: 'Flávio',
      mail: 'bzsflaaavio@gmail.com',
      password: '123456',
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Duplicated email, user already exists.');
});
