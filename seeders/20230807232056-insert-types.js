'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Types', [
      {
        name: 'House',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apartment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Guesthouse',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hotel',
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
    return queryInterface.bulkDelete('Types', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
