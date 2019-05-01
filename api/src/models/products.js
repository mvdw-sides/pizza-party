import Sequelize from "sequelize";

export class Product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    Product.hasMany(models.ProductVariation);
  }
}

export default Product;
