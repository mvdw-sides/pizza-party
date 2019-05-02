import { Product } from "../../models";

export default async (/* filters */) => {
  const products = await Product.findAll();
  return products;
};
