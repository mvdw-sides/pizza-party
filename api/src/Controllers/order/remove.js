import Boom from "@hapi/boom";
import { Order } from "../../models";
import { where } from "../../Utils/general";

export default async ({ id }) => {
  const order = await Order.findOne({ where: where(id) });

  const nonValid = ["delivering", "delivered", "cancelled"];
  if (nonValid.includes(order.status)) {
    return Boom.badRequest(
      "This order can't be changed or cancelled at it's current state."
    );
  }

  order.status = "cancelled";
  await order.save;

  return order;
};
