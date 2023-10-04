'use strict';

/** @type {import('sequelize-cli').Migration} */
const { hashPassword } = require('../helpers/bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'arbi', 
        email: 'arbi@gmail.com', 
        password: hashPassword('12345'),
        role: 'admin', 
        phoneNumber: '087777777777', 
        address: 'JL. Bandung',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'donny', 
        email: 'donny@gmail.com', 
        password: hashPassword('12345'),
        role: 'admin', 
        phoneNumber: '087777777778', 
        address: 'JL. Riau',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'open', 
        email: 'open@gmail.com', 
        password: hashPassword('12345'),
        role: 'admin', 
        phoneNumber: '087777777779', 
        address: 'JL. Medan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'nacha', 
        email: 'nacha@gmail.com', 
        password: hashPassword('12345'),
        role: 'admin', 
        phoneNumber: '087777777710', 
        address: 'JL. BSD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
