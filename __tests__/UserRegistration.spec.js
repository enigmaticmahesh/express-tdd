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

const validUser = {
  username: 'user1',
  email: 'user1@email.com',
  password: 'P4ssword',
};

const postUser = (user = validUser) =>
  request(app).post('/api/1.0/users').send(user);

describe('User Registration', () => {
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
    const response = await postUser();
    expect(response.status).toBe(200); // Here, expect is from jest not supertest
  });

  it('return success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves the user to database', async () => {
    await postUser();
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@email.com');
  });

  it('hashes the password in the database', async () => {
    await postUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });

  it('returns 400 when username is null', async () => {
    const response = await postUser({ ...validUser, username: null });
    expect(response.status).toBe(400);
  });

  it('returns validationErrors fields in response body when validation error occurs', async () => {
    const response = await postUser({ ...validUser, username: null });
    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });

  it('returns both the validation errors when username and email is null', async () => {
    const response = await postUser({
      ...validUser,
      email: null,
      username: null,
    });
    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });

  // Method 1 for Dynamic tests
  // it.each([
  //   ['username', 'Username cannot be null'],
  //   ['email', 'Email cannot be null'],
  //   ['password', 'Password cannot be null'],
  // ])('When %s is null %s is received', async (field, expectedMessage) => {
  //   const response = await postUser({ ...validUser, [field]: null });
  //   const body = response.body;
  //   expect(body.validationErrors[field]).toBe(expectedMessage);
  // });

  // Method 2 for Dynamic tests
  it.each`
    field         | expectedMessage
    ${'username'} | ${'Username cannot be null'}
    ${'email'}    | ${'Email cannot be null'}
    ${'password'} | ${'Password cannot be null'}
  `(
    'return $expectedMessage when $field is null',
    async ({ field, expectedMessage }) => {
      const response = await postUser({ ...validUser, [field]: null });
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );
});
