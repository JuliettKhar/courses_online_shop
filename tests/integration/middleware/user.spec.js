const user = require('../../../middleware/user');
const User = require('../../../models/user');
let server;

describe('user middleware', () => {
  let next = jest.fn().mockReturnValue(true);
  let res;
  let req;

  beforeEach(() => server = require('../../../index'));
  afterEach(() => server.close());

  it('should return true if hasn\'t user', async () => {
    const req = {session: {}};
    const res = {};

    expect(await user(req, res, next)).toBe(true);
  });

    it('should return user', async () => {
    const req = { session: { user: {_id: '6127b5f26b0702cbf49d06a1' } } };
    const res = { redirect: jest.fn().mockReturnValue(false) };

     const testUser = await user(req, res, next)
     expect(testUser).toBe(undefined);
  });
});
