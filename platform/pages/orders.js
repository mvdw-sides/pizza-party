import * as axios from "axios";

import {
  Anchor,
  Box,
  ResponsiveContext,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "grommet";
import { Checkmark, Close, Deliver, Restaurant, UserNew } from "grommet-icons";
import React, { Component } from "react";

import { Link } from "../routes";
import { OrderConsumer } from "../components/order.context";

const options = [
  "submitted",
  "preparing",
  "delivering",
  "delivered",
  "cancelled"
];
const getIcon = status => {
  return {
    submitted: <UserNew />,
    preparing: <Restaurant />,
    delivering: <Deliver />,
    delivered: <Checkmark />,
    cancelled: <Close />
  }[status];
};

class Product extends Component {
  static async getInitialProps({ query, req }) {
    try {
      const api = !!req ? "http://api:7002" : "http://api.local.test";
      const { data: orders } = await axios.get(`${api}/orders`);

      return { ...query, orders };
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      orders: props.orders || []
    };
  }

  async onChange(status, orderId) {
    const { data: response } = await axios.put(
      `http://api.local.test/orders/${orderId}`,
      { status }
    );
    return response;
  }

  render() {
    const { orders } = this.state;

    return (
      <OrderConsumer>
        {orderContext => (
          <ResponsiveContext.Consumer>
            {size => (
              <Box>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Order ID
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Customer
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Address
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Phone
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Price
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Status
                      </TableCell>
                      <TableCell scope="col" border="bottom" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((record, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell scope="row">{record.id}</TableCell>
                          <TableCell scope="row">
                            {record.Address.firstName} {record.Address.lastName}
                          </TableCell>
                          <TableCell scope="row">
                            {record.Address.city} {record.Address.street}{" "}
                            {record.Address.address}
                          </TableCell>
                          <TableCell scope="row">
                            {record.Address.phone}
                          </TableCell>
                          <TableCell scope="row">
                            ${record.totalPrice / 100}
                          </TableCell>

                          <TableCell>
                            <Select
                              icon={getIcon(record.status)}
                              value={record.status}
                              options={options}
                              onChange={async ({ value }) => {
                                const updated = orders.map(order => {
                                  if (order.id !== record.id) {
                                    return order;
                                  }
                                  order.status = value;
                                  return order;
                                });
                                await this.onChange(value, record.id);
                                this.setState({ orders: updated });
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Link route={`/orders/${record.guid}`}>
                              <Anchor href={`/orders/${record.guid}`}>
                                Go to order
                              </Anchor>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        )}
      </OrderConsumer>
    );
  }
}

export default Product;
