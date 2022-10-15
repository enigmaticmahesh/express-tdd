const request = require('supertest');
const app = require('../src/app');

describe('User Registration', () => {
  it('return 200 OK when signup request is valid', (done) => {
    //   Method 1
    // request(app)
    // .post('/api/1.0/users')
    // .send({
    //   username: 'user1',
    //   email: 'user1@email.com',
    //   password: 'P4ssword',
    // })
    // .expect(200, done);

    // Method 2
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then((response) => {
        expect(response.status).toBe(200); // Here, expect is from jest not supertest
        done();
      });
  });

  it('return success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });
});
