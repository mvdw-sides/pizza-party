import { Product } from "../../models";
import { paginate } from "../../Utils/general";

export default async filters => {
  const products = await Product.findAll({ ...paginate(filters) });
  return products;
};
