import Sequelize from "sequelize";

export class OrderProduct extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        productId: DataTypes.INTEGER,
        variationId: DataTypes.INTEGER,
        orderI: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
      },
      { sequelize }
    );
  }

  static associate(models) {
    OrderProduct.belongsTo(models.Order, {
      foreignKey: "orderId"
    });
  }
}

export default OrderProduct;
