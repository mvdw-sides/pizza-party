import Sequelize from "sequelize";

export class Address extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        address: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        phone: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    Address.belongsTo(models.Order, {
      foreignKey: "addressId"
    });
  }
}

export default Address;
