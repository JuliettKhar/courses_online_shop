const user = require('../../../middleware/user');
const mongoose = require('mongoose');

let server;

describe('user middleware', () => {
  let next = jest.fn().mockReturnValue(true);
  let res;
  let req;

  beforeEach(() => server = require('../../../index'));
  afterEach(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  it('should return true if hasn\'t user', async () => {
    const req = {session: {}};
    const res = {};
    const testUser = await user(req, res, next)

    expect(testUser).toBe(true);
  });
});
