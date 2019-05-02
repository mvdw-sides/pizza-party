import { Product, ProductVariation } from "../../models";
const Boom = require("@hapi/boom");

export default async ({ id }) => {
  // list of pre-defined attributes we'll fetch from the database
  const attributes = {
    product: ["name", "description", "id"],
    productVariation: ["name", "description", "price", "id"]
  };

  // fetch the actual entity
  const product = await Product.findOne({
    where: {
      id
    },
    attributes: attributes.product,
    include: [
      { model: ProductVariation, attributes: attributes.productVariation }
    ]
  });

  // no product was found
  if (!product) {
    return Boom.notFound("Invalid Request");
  }

  // return the entity
  return product;
};
