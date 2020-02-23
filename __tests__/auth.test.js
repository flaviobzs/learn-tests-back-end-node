import request from 'supertest';
import app from '../src/app';

// import User from '../src/app/models/User';

import factoryUser from './factories/UserFactory';

test('Should create a new user', async () => {
  const user = await factoryUser.attrs('User', {
    name: 'JohnDoe',
    mail: `132${Date.now()}xx@gmail.com`,
  });

  const response = await request(app)
    .post('/auth/signup')
    .send(user);

  expect(response.status).toBe(201);
  expect(response.body.name).toBe('JohnDoe');
  expect(response.body).not.toHaveProperty('password');
});

test('Should recept a token when auth a user', async () => {
  const user = await factoryUser.attrs('User', {
    password: '123456',
  });

  const userAuth = await request(app)
    .post('/users')
    .send(user);

  const { mail } = userAuth.body;

  const response = await request(app)
    .post('/auth/signin')
    .send({
      mail,
      password: '123456',
    });

  console.log(response.body);
  console.log(userAuth.body);
  console.log(user);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

test('Should not auth a user with wrong password', async () => {
  const user = await factoryUser.attrs('User', {
    mail: `${Date.now()}xx@gmail.com`,
    password: '123456',
  });

  const userAuth = await request(app)
    .post('/users')
    .send(user);

  const { mail } = userAuth.body;

  const response = await request(app)
    .post('/auth/signin')
    .send({
      mail,
      password: 'XXXXssdsXXX',
    });

  expect(response.status).toBe(401);
  expect(response.body.error).toBe('Password does not match');
});

test('Should not auth a user does not exists ', async () => {
  const response = await request(app)
    .post('/auth/signin')
    .send({
      mail: 'joser@gmail.com',
      password: 'XXXasXssdsXXX',
    });

  expect(response.status).toBe(401);
  expect(response.body.error).toBe('User not found');
});

test('Should not access a route without token', async () => {
  const response = await request(app).get('/users');

  expect(response.status).toBe(401);
});
