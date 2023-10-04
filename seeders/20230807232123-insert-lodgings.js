'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Lodgings', [
      {
        name: 'Rumah 404',
        facility: 'Wifi, Kitchen, TV, Washer, EV charger',
        roomCapacity: 7,
        imgUrl: 'https://images.adsttc.com/media/images/64b6/6d4f/cb9c/4614/f0a9/1a2f/slideshow/oberoi-villa-arkana-architects_8.jpg?1689677149',
        authorId: 3,
        location: 'Ubud, Indonesia',
        price: 1100000,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
      },
      {
        name: 'Apartemen 201',
        facility: 'Wifi, Kitchen, TV, Air Conditioning, Hot tub',
        roomCapacity: 2,
        imgUrl: 'https://images.adsttc.com/media/images/5cc9/d67d/284d/d128/3b00/01b0/slideshow/_FI.jpg?1556731512',
        authorId: 4,
        location: 'Jakarta, Indonesia',
        price: 200000,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
      },
      {
        name: 'Guesthouse 500',
        facility: 'Kitchen, Air Conditioning, Heating, Free parking, Indoor fireplace',
        roomCapacity: 4,
        imgUrl: 'https://images.adsttc.com/media/images/6229/d4d3/bea5/d001/663a/ca6e/slideshow/interior-3-202108-image-by-indra-wiras.jpg?1646908690',
        authorId: 4,
        location: 'Bandung, Indonesia',
        price: 700000,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
      },
      {
        name: 'Hotel 200',
        facility: 'Wifi, Kitchen, TV, Air Conditioning, Hot tub',
        roomCapacity: 2,
        imgUrl: 'https://images.adsttc.com/media/images/5785/ab8b/e58e/ce38/2200/0098/slideshow/Katamama_RooftopSuite_MainRoom_Dusk.jpg?1468377990',
        authorId: 3,
        location: 'Kuta Utara, Indonesia',
        price: 700000,
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active'
      }
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
    return queryInterface.bulkDelete('Lodgings', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
