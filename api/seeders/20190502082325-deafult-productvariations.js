"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) =>
      resolve(
        queryInterface.bulkInsert(
          "ProductVariations",
          [
            {
              name: "Small",
              description: "10cm",
              price: 500,
              productId: 1,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Medium",
              description: "20cm",
              price: 700,
              productId: 1,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Large",
              description: "30cm",
              price: 850,
              productId: 1,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Small",
              description: "10cm",
              price: 500,
              productId: 2,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Medium",
              description: "20cm",
              price: 700,
              productId: 2,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Large",
              description: "30cm",
              price: 850,
              productId: 2,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Small",
              description: "10cm",
              price: 500,
              productId: 3,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Medium",
              description: "20cm",
              price: 700,
              productId: 3,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            },
            {
              name: "Large",
              description: "30cm",
              price: 850,
              productId: 3,
              createdAt: Sequelize.literal("NOW()"),
              updatedAt: Sequelize.literal("NOW()")
            }
          ],
          {}
        )
      )
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
