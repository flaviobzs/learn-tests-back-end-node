import request from 'supertest';
import app from '../src/app';

test('Should list all users', async () => {

  const response = await request(app).get('/client');

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(1);
  expect(response.body[0]).toHaveProperty('name', 'John Doe');

});

test('Should create a new user', async () => {

  const response = await request(app)
    .post('/client')
    .send({ name: 'John Doe', mail: 'john@mail.com'});

  expect(response.status).toBe(201);
  expect(response.body.name).toBe('John Doe');
});
