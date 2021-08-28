const request = require('supertest');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

let server;

describe('auth middleware', () => {
  let csrf;

  beforeEach(async () => {
    server = require('../../../index');

    const res = await request(server).get('/new');
    const $ = cheerio.load(res.text);
    csrf = await $('[name=_csrf]').val();
  });

  afterEach(async() => {
    // await request(server).get('/auth/logout');
    await mongoose.connection.close();
    server.close()
  });

  it('POST /new', async () => {
    // const res = request(server)
    //   .post('/auth/login')
    //   .send({
    //      username: 'admin@mail.ru',
    //      password: '123',
    //      _csrf: csrf
    //    })
    //
    // expect(res._data._csrf).toBe(csrf)

    const res = await request(server).post('/new').send({
      title: "New Course",
      price: "1000",
      image: "",
      _csrf: csrf
    })
    console.log(csrf)
     // console.log(res)
  });
});
