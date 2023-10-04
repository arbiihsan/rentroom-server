const request = require('supertest')
const app = require('../app')
const { User, Lodging } = require('../models')
const { sequelize } = require('../models')

afterAll(async () => {
  await User.destroy({
    truncate: true, restartIdentity: true, cascade: true
  })
})

describe('User Routes', () => {
  describe('POST /customers/register', () => {
    it('should successfully register a new user', async () => {
      const response = await request(app)
        .post('/customers/register')
        .send({
          email: 'test1@gmail.com',
          password: 'test123',
        })
        .set('Accept', 'application/json')

      // console.log(response.body, '<<<<<<<<<<');
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id', expect.any(Number));
      expect(response.body).toHaveProperty('email', 'test1@gmail.com');
    });

  });

  describe('POST /customers/login', () => {
    it('should successfully log in a user with valid credentials', async () => {
      await User.create({ email: 'test2@gmail.com', password: 'test123' });

      const response = await request(app)
        .post('/customers/login')
        .send({
          email: 'test2@gmail.com',
          password: 'test123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('access_token');
    });

  });
});
