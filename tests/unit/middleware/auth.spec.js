const auth = require('../../../middleware/auth');

describe('auth middleware', () => {
  let next = jest.fn().mockReturnValue(true);
  let res;
  let req;

  it('should return undefined if is auth', async () => {
    const req = {session: {isAuthenticated: true}};
    const res = {redirect: jest.fn().mockReturnValue(true)};

    expect(auth(req, res, next)).toBe(undefined);
  })

    it('should return false if  isn\'t auth', async () => {
    const req = {session: {isAuthenticated: false}};
    const res = {redirect: jest.fn().mockReturnValue(false)};

    expect(auth(req, res, next)).toBe(false);
  })
});
