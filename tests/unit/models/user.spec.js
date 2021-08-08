const User = require('../../../models/user');

describe('', () => {
  it('should return user', () => {
    const user = new User({
      email: 'example@test.com',
      name: 'User',
      password: '12345',
      resetToken: 'token',
      resetTokenExp: Date.now(),
      avatarUrl: '',
      cart: {}
    })
    const expectedKeys = [
      "_id",
      "email",
      "name",
      "password",
      "resetToken",
      "resetTokenExp",
      "avatarUrl",
      "cart"
    ]

    expect(user.toObject()).toBeDefined();
    expect(expectedKeys).toContain(...Object.keys(user.toObject()));
  })
})
