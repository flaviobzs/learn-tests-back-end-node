import request from 'supertest';
import app from '../src/app';

// const google = request('http://www.google.com');

test('Should  answer on port 3333', async () => {
  // return google.get('/').then(res => expext(res.status).toBe(200)); // aqui não precisa usar o async e await

  // acessar a url http://localhost:3333
  const response = await request(app).get('/');

  // responder com o status 200
  expect(response.status).toBe(200);
});
