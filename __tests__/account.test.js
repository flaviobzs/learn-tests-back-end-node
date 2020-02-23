import request from 'supertest';
import app from '../src/app';
import factoryUser from './factories/UserFactory';
import factoryAccount from './factories/AccountFactory';

let user;

beforeAll(async () => {
  const res = await factoryUser.attrs('User', {
    name: 'Jose',
    mail: 'bzs@gmail.com',
  });

  user = res;
});

console.log(user);

test('Should create a new account', async () => {
  const account = await factoryAccount.attrs('Account', {
    user_id: 2,
  });

  const response = await request(app)
    .post('/accounts')
    .send(account);

  expect(response.status).toBe(201);
});

test('Should not create a new account without atribute name', async () => {
  const response = await request(app)
    .post('/accounts')
    .send({
      user_id: 2,
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Name is obrigatory');
});

test.skip('Should not create a new user with atribute name duplicaded', async () => {});

test('Should list accounts', async () => {
  const account = await factoryAccount.attrs('Account', {
    user_id: 2,
  });

  await request(app)
    .post('/accounts')
    .send(account);

  const response = await request(app).get('/accounts');

  expect(response.status).toBe(200);
  expect(response.status).toBeGreaterThan(0);
});

test.skip('Should only list user accounts', async () => {});

test('Should show account with id', async () => {
  const account = await factoryAccount.attrs('Account', {
    name: 'CT10',
    user_id: 2,
  });

  const response_account = await request(app)
    .post('/accounts')
    .send(account);

  const response = await request(app).get(
    `/accounts/${response_account.body.id}`
  );

  expect(response.status).toBe(200);
  expect(response.body.name).toBe('CT10');
  expect(response.body.user_id).toBe(2);
});

test.skip('Should not show account with id another user', async () => {});

test('Should edit one account with id', async () => {
  const account = await factoryAccount.attrs('Account', {
    name: 'CT19',
    user_id: 2,
  });

  const response_account = await request(app)
    .post('/accounts')
    .send(account);

  const response = await request(app)
    .put(`/accounts/${response_account.body.id}`)
    .send({
      name: 'CX19',
    });

  expect(response.status).toBe(200);
  expect(response.body.name).toBe('CX19');
  expect(response.body.user_id).toBe(2);
});

test.skip('Should not update account with id another user', async () => {});

test('Should delete a existenct account', async () => {
  const account = await factoryAccount.attrs('Account', {
    name: 'CT30',
    user_id: 10,
  });

  const response_account = await request(app)
    .post('/accounts')
    .send(account);

  const response = await request(app).delete(
    `/accounts/${response_account.body.id}`
  );

  expect(response.status).toBe(204);

  const get = await request(app).get(`/accounts/${response_account.body.id}`);

  expect(get.status).toBe(200);
  expect(get.body).toBe(null);
});

test.skip('Should not delete account with id another user', async () => {});
