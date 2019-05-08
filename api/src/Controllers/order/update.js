import { Address, Order, OrderProduct, ProductVariation } from "../../models";

import Boom from "@hapi/boom";
import Validate from "../../Utils/validate";
import validate from "../../Utils/validate";
import { where } from "../../Utils/general";

export default async ({ id }, data) => {
  const order = await Order.findOne({ where: where(id) });

  // validate both the db data and the body data for the status,
  const nonValid = ["delivering", "delivered", "cancelled"];
  if (
    nonValid.includes(order.status) &&
    (!data.status || nonValid.includes(data.status))
  ) {
    return Boom.badRequest(
      "This order can't be changed or cancelled at it's current state."
    );
  }

  // update status seporate
  if (data.status /* && authenticated */) {
    order.status = data.status;
    await order.save();
  }

  let price = 0;
  // check the products
  if (data.products) {
    let products = await ProductVariation.findAll({
      where: {
        id: data.products.map(p => p.id)
      }
    });

    products = data.products.map(p => {
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

    // just remove the old ones it's the easiest solution instead of cherrypicking
    await OrderProduct.destroy({ where: { orderId: order.id } });
    await OrderProduct.bulkCreate(
      products.map(p => {
        p.orderId = order.id;
        return p;
      })
    );
  }

  const errors = [];
  // check the address
  if (data.address) {
    const address = await Address.findOne({ where: { id: order.addressId } });
    Object.keys(data.address).forEach(key => {
      if (key === "phone" && !validate.phone(data.address.phone)) {
        errors.push("invalid phone");
        return;
      }
      console.log(validate.postcode(data.address.zipCode));
      if (key === "zipCode" && !validate.postcode(data.address.zipCode)) {
        errors.push("invalid zip");
        return;
      }
      address[key] = data.address[key];
    });

    if (errors.length) {
      return Boom.badRequest(errors);
    }
    await address.save();
  }

  if (price > 0) {
    order.totalPrice = price;
  }

  console.log(errors.length);

  await order.save();

  return order;
};
