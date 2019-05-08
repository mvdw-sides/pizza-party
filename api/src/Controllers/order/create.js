import { Address, Order, OrderProduct, ProductVariation } from "../../models";

import Boom from "@hapi/boom";
import Validate from "../../Utils/validate";
import uuid from "uuid/v4";

export default async info => {
  // TODO: Verify all the data

  const errors = [];
  if (!info.address.zipCode || !Validate.postcode(info.address.zipCode)) {
    errors.push("invalid zipcode");
  }

  if (!info.address.phone || !Validate.phone(info.address.phone)) {
    errors.push("Invalid phone");
  }

  ["firstName", "lastName", "city", "street", "address"].forEach(key =>
    info.address[key] ? true : errors.push(`${key} is required`)
  );

  if (errors.length) {
    return Boom.badRequest(errors);
  }

  const address = await Address.create({ ...info.address });

  let price = 0;

  let products = await ProductVariation.findAll({
    where: {
      id: info.products.map(p => p.id)
    }
  });

  products = info.products.map(p => {
    products.forEach(pr => {
      if (pr.id === p.id) {
        p.price = p.quantity * pr.price;
        price += p.price;
        p.productId = pr.productId;
        p.variationId = pr.id;
        delete p.id;
      }
    });
    return p;
  });

  let order = await Order.create({
    status: "submitted",
    totalPrice: price,
    addressId: address.id,
    guid: uuid()
  });

  order = order.get({ plain: true });

  await OrderProduct.bulkCreate(
    products.map(p => {
      p.orderId = order.id;
      return p;
    })
  );

  order.items = await OrderProduct.findAll({
    where: { orderId: order.id }
  });

  return order;
};
