const request = require('supertest');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

let server = require('../../../index');

async function getCsrf(html) {
  const $ = cheerio.load(html);
  return await $('[name=_csrf]').val();
}

async function login() {
  const res = await request(server).get('/auth/login');
  return await getCsrf(res.text);
}

describe('auth middleware', () => {
  let csrf;

  beforeEach(async () => {
    server = require('../../../index');
    csrf = await login();
  });

  afterEach(() => server.close());
  afterAll(async () => {
    await request(server).get('/auth/logout');
    await mongoose.connection.close();
  })

  it('GET /', async () => {
    const res = request(server)
      .post('/auth/login')
      .send({
         username: 'admin@mail.ru',
         password: '123',
         _csrf: csrf
       })

    expect(res._data._csrf).toBe(csrf)
  });
});
