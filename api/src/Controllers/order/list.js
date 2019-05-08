import { Address, Order, OrderProduct } from "../../models";

import { paginate } from "../../Utils/general";

export default async filters => {
  const orders = await Order.findAll({
    include: [OrderProduct, Address],
    ...paginate(filters)
  });
  return orders;
};
