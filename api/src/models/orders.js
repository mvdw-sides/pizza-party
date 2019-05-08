import Sequelize from "sequelize";

export class Order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        addressId: DataTypes.INTEGER,
        totalPrice: DataTypes.INTEGER,
        status: DataTypes.STRING,
        guid: DataTypes.UUID
      },
      { sequelize }
    );
  }

  static associate(models) {
    Order.belongsTo(models.Address, {
      foreignKey: "id"
    });

    Order.hasMany(models.OrderProduct, {
      foreignKey: "orderId"
    });
  }
}

export default Order;
