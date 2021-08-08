const Course = require('../../../models/course');

describe('test course model', () => {
  let course = new Course({
      title: 'Course',
      price: 0
    }).toObject();

  it('should create course instance', () => {
    expect(course).toBeDefined();
  });

  it('should contain all required props', () => {
    expect(["_id", "title", "price"]).toContain(...Object.keys(course));
  });

  it('should format _id to id for client', () => {
    const courseToClient = Course({}).toClient();

    expect(['id']).toContain(...Object.keys(courseToClient))
  });

})
