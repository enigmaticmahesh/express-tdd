const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

// All these before calls should return, which lets jest know that these are asynchronous calls and it needs to wait
// This makes the DB to create/connect if created, so that it is synchrnized with the actual DB
beforeAll(() => sequelize.sync());
// As we are caaling the same endpoint in each of the tests, so the User gets created each time
// To fix that we make sure that the row gets deleted before each test to get the desired results
beforeEach(() => User.destroy({ truncate: true }));

describe('User Registration', () => {
  const postValidUser = () =>
    request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@email.com',
      password: 'P4ssword',
    });

  // One way of writing test
  // it('return 200 OK when signup request is valid', (done) => {
  //   //   Method 1
  //   // request(app)
  //   // .post('/api/1.0/users')
  //   // .send({
  //   //   username: 'user1',
  //   //   email: 'user1@email.com',
  //   //   password: 'P4ssword',
  //   // })
  //   // .expect(200, done);

  //   // Method 2
  //   request(app)
  //     .post('/api/1.0/users')
  //     .send({
  //       username: 'user1',
  //       email: 'user1@email.com',
  //       password: 'P4ssword',
  //     })
  //     .then((response) => {
  //       expect(response.status).toBe(200); // Here, expect is from jest not supertest
  //       done();
  //     });
  // });

  // Another way of writing test
  it('return 200 OK when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200); // Here, expect is from jest not supertest
  });

  it('return success message when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves the user to database', async () => {
    await postValidUser();
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postValidUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@email.com');
  });

  it('hashes the password in the database', async () => {
    await postValidUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });
});
