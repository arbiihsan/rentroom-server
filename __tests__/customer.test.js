const request = require('supertest');
const app = require('../app');
const { sequelize, User, Lodging, Type, Bookmark } = require('../models');

describe('Customer Lodgings Routes', () => {
  beforeAll(async () => {
    const sampleLodgings = [
      { name: 'Lodging 1', facility: 'Facility 1', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 1', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 2', facility: 'Facility 2', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 2', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 3', facility: 'Facility 3', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 3', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 4', facility: 'Facility 4', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 4', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 5', facility: 'Facility 5', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 5', price: 75000, typeId: 2, status: 'Active', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 6', facility: 'Facility 6', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 6', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 7', facility: 'Facility 7', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 7', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 8', facility: 'Facility 8', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 8', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 9', facility: 'Facility 9', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 9', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 10', facility: 'Facility 10', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 10', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 11', facility: 'Facility 11', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 11', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 12', facility: 'Facility 12', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 12', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 13', facility: 'Facility 13', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 13', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 14', facility: 'Facility 14', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 14', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 15', facility: 'Facility 15', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 15', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 16', facility: 'Facility 16', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 16', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 17', facility: 'Facility 17', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 17', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 18', facility: 'Facility 18', roomCapacity: 4, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 18', price: 75000, typeId: 3, status: 'Active', authorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 19', facility: 'Facility 19', roomCapacity: 2, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 19', price: 75000, typeId: 1, status: 'Active', authorId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lodging 20', facility: 'Facility 20', roomCapacity: 3, imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149', location: 'Location 20', price: 75000, typeId: 2, status: 'Inactive', authorId: 2, createdAt: new Date(), updatedAt: new Date() }
    ];

    const sampleUser = [
      { email: 'user1@example.com', password: 'password1', createdAt: new Date(), updatedAt: new Date() },
      { email: 'user2@example.com', password: 'password2', createdAt: new Date(), updatedAt: new Date() },
      { email: 'user3@example.com', password: 'password3', createdAt: new Date(), updatedAt: new Date() },
    ]

    const sampleType = [
      { name: 'type1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'type1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'type1', createdAt: new Date(), updatedAt: new Date() },
    ]

    const sampleBookmark = [
      { authorId: 1, lodgingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { authorId: 2, lodgingId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]

    await User.bulkCreate(sampleUser);
    await Type.bulkCreate(sampleType);
    await Lodging.bulkCreate(sampleLodgings);
    await Bookmark.bulkCreate(sampleBookmark);
  });

  afterAll(async () => {
    await Bookmark.destroy({
      truncate: true, restartIdentity: true, cascade: true
    })
    await Lodging.destroy({
      truncate: true, restartIdentity: true, cascade: true
    })
    await Type.destroy({
      truncate: true, restartIdentity: true, cascade: true
    })
    await User.destroy({
      truncate: true, restartIdentity: true, cascade: true
    })
  })

  describe('GET /customers/lodgings', () => {
    it('should return a list of lodgings without query filter parameter', async () => {
      const response = await request(app).get('/customers/lodgings');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data).toHaveLength(9);
    });

    it('should return a list of lodgings with query filter parameter', async () => {
      const response = await request(app).get('/customers/lodgings/?page=1')
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.data).toHaveLength(9);
    });

    it('should return a list of lodgings with query filter parameter', async () => {
      const response = await request(app).get('/customers/lodgings/?filterByTypeId=1')
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('should return a specific lodging by ID', async () => {
      const id = 2;
      const lodgings = await Lodging.findByPk(id);
      const response = await request(app).get(`/customers/lodgings/${id}`);
      const { lodging } = response.body
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(lodging).toHaveProperty('id', id);
    });

    it('should return 404 when lodging ID is not found', async () => {
      const response = await request(app).get('/customers/lodgings/9999');
      expect(response.status).toBe(404);
    });
  });

  // describe('POST /customers/bookmarks/:lodgingId', () => {
  //   it('should successfully log in a user with valid credentials', async () => {
  //     await User.create({ email: 'test2@gmail.com', password: 'test123' });

  //     const response = await request(app)
  //       .post('/customers/login')
  //       .send({
  //         email: 'test2@gmail.com',
  //         password: 'test123',
  //       });

  //     // console.log(response.body, '<<<<ININI');
  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeInstanceOf(Object);
  //     expect(response.body).toHaveProperty('access_token');
  //   });

  //   it('should add a bookmark for a lodging', async () => {
  //     const lodgingId = 2; // Choose a lodging ID that exists in your sample data
  //     const response = await request(app)
  //       .post(`/customers/bookmarks/${lodgingId}`)
  //       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2OTMxMDM3NzR9.W0X5nsNJPG2Q35w6svb-YdGxiT7ayQAUO7LrzEkjTs4')

  //     console.log(response.req.headers, '<<<<22222');
  //     console.log(response.body, '<<<<ININI');
  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeInstanceOf(Object);
  //     expect(response.body).toHaveProperty('message', 'Success add bookmark');
  //   });

  //   it('should return an error if lodging ID is not found', async () => {
  //     const nonExistentLodgingId = 9999;
  //     const response = await request(app)
  //       .post(`/customers/bookmarks/${nonExistentLodgingId}`)
  //       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2OTMxMDM3NzR9.W0X5nsNJPG2Q35w6svb-YdGxiT7ayQAUO7LrzEkjTs4');

  //     expect(response.status).toBe(404);
  //     expect(response.body).toHaveProperty('error', 'Lodging not found');
  //   });
  // });

  // describe('GET /customers/bookmarks', () => {
  //   it('should return a list of bookmarks for a customer', async () => {
  //     const response = await request(app)
  //       .get('/customers/bookmarks')
  //       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2OTMxMDM3NzR9.W0X5nsNJPG2Q35w6svb-YdGxiT7ayQAUO7LrzEkjTs4');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeInstanceOf(Object);
  //   });
  // });

  // describe('DELETE /customers/bookmarks/:lodgingId', () => {
  //   it('should delete a bookmark for a lodging', async () => {
  //     const lodgingId = 2; // Choose a lodging ID for an existing bookmark
  //     const response = await request(app)
  //       .delete(`/customers/bookmarks/${lodgingId}`)
  //       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2OTMxMDM3NzR9.W0X5nsNJPG2Q35w6svb-YdGxiT7ayQAUO7LrzEkjTs4');

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty('message', 'Bookmark deleted successfully');
  //   });

  //   it('should return an error if bookmark is not found', async () => {
  //     const nonExistentBookmarkLodgingId = 9999;
  //     const response = await request(app)
  //       .delete(`/customers/bookmarks/${nonExistentBookmarkLodgingId}`)
  //       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpYXQiOjE2OTMxMDM3NzR9.W0X5nsNJPG2Q35w6svb-YdGxiT7ayQAUO7LrzEkjTs4');

  //     expect(response.status).toBe(404);
  //     expect(response.body).toHaveProperty('error', 'Bookmark not found');
  //   });
  // });
});


