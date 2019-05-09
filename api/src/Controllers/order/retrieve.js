import {
  Address,
  Order,
  OrderProduct,
  Product,
  ProductVariation
} from "../../models";

import Boom from "@hapi/boom";
import { where } from "../../Utils/general";

export default async ({ id }) => {
  const order = await Order.findOne({
    where: where(id),
    include: [
      { model: OrderProduct, include: [ProductVariation, Product] },
      Address
    ]
  });

  if (!order) {
    Boom.notFound("Order not found");
  }
  return order;
};
