import Sequelize from "sequelize";

export class ProductVariation extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        productId: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    ProductVariation.belongsTo(models.Product, {
      foreignKey: "productId"
    });
  }
}

export default ProductVariation;
