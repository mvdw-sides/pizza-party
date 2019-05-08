import { Address, Order, OrderProduct } from "../../models";

import Boom from "@hapi/boom";
import { where } from "../../Utils/general";

export default async ({ id }) => {
  const order = await Order.findOne({
    where: where(id),
    include: [OrderProduct, Address]
  });

  if (!order) {
    Boom.notFound("Order not found");
  }
  return order;
};
