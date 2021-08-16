const request = require('supertest');
const Course = require('../../../models/course');

let server;

describe('/courses', () => {
  beforeEach(() => server = require('../../../index'));
  afterEach(async () => {
    server.close();
    await Course.remove({});
  });

  describe('GET /', () => {
    it('should return all courses', async () => {
      await Course.collection.insertMany([
        {title: 'course1', price: 20},
        {title: 'course2', price: 30},
      ])
      const res = await request(server).get('/courses');

      expect(res.status).toBe(200);
      expect(res.text).toBeTruthy();
    });
  });
});
