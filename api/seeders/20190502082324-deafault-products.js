"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) =>
      queryInterface.bulkInsert(
        "Products",
        [
          {
            name: "Pizza Roasted Veggi",
            description:
              "Tomatensaus, Mozzarella, Rode ui, Verse tomaat, Verse spinazie, Geroosterde paprika en courgette en Provençaalse kruiden",
            createdAt: Sequelize.literal("NOW()"),
            updatedAt: Sequelize.literal("NOW()")
          },
          {
            name: "Pizza Roasted Chicken",
            description:
              "Tomatensaus, Mozzarella, Rode ui, Geroosterde paprika en courgette, Gegrilde kip, Kip kebab en Provençaalse kruiden",
            createdAt: Sequelize.literal("NOW()"),
            updatedAt: Sequelize.literal("NOW()")
          },
          {
            name: "Pizza Roasted Beef",
            description:
              "Hickory BBQ-saus, Mozzarella, Champignons, Gegrilde biefstuk, Bacon & Lente-ui",
            createdAt: Sequelize.literal("NOW()"),
            updatedAt: Sequelize.literal("NOW()")
          }
        ],
        {}
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
