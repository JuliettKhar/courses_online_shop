const Order = require('../../../models/order');

describe('', () => {
  it('should return order', () => {
    const order = new Order({
      courses: [],
      user: {},
      date: Date.now()
    })

    expect(order.toObject()).toBeDefined();
    expect(["_id", "courses", "user", "date"]).toContain(...Object.keys(order.toObject()));
  });
})
