import * as axios from "axios";

import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text
} from "grommet";
import React, { Component } from "react";

import { Deliver } from "grommet-icons";
import { OrderConsumer } from "../components/order.context";

class Product extends Component {
  static async getInitialProps({ query, req }) {
    try {
      const api = !!req ? "http://api:7002" : "http://api.local.test";
      const { data: order } = await axios.get(`${api}/orders/${query.guid}`);

      return { ...query, order };
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      order: props.order || null
    };
  }

  render() {
    const { order } = this.state;
    if (!order) {
      return <div />;
    }
    console.log(order);
    const products = order.OrderProducts;
    return (
      <OrderConsumer>
        {orderContext => (
          <ResponsiveContext.Consumer>
            {size => (
              <Box direction="row" wrap justify="between">
                <Box width="65%" align="center">
                  <Box direction="column" justify="between">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell scope="col" border="bottom">
                            <Text>Product</Text>
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            <Text>Type</Text>
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            <Text>Quantity</Text>
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            <Text>Price</Text>
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            <Text>Total</Text>
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((record, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell scope="row">
                                {record.Product.name}
                              </TableCell>
                              <TableCell scope="row">
                                {record.ProductVariation.name}
                              </TableCell>
                              <TableCell scope="row">
                                {record.quantity}
                              </TableCell>
                              <TableCell scope="row">
                                ${record.ProductVariation.price / 100}
                              </TableCell>
                              <TableCell scope="row">
                                ${record.price / 100}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableRow key="totals">
                          <TableCell scope="row" />
                          <TableCell scope="row" />
                          <TableCell scope="row" />
                          <TableCell scope="row" />
                          <TableCell border="top" scope="row">
                            <strong>${order.totalPrice / 100}</strong>
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Box>
                </Box>
                <Box
                  pad="small"
                  margin="xsmall"
                  width="30%"
                  style={{
                    minWidth: "300px"
                  }}
                  background="white"
                  elevation="small"
                >
                  <Text>{order.status}</Text>
                </Box>
                <Form
                  onSubmit={async e => {
                    e.preventDefault();
                    const { guid } = this.submit(e, orderContext.list);
                    orderContext.set([]);
                    Router.push("orders", { id: guid });
                  }}
                  style={{
                    width: "100%"
                  }}
                >
                  <Box
                    flex
                    wrap="wrap"
                    direction="row"
                    justify="around"
                    pad="small"
                    margin={{ horizontal: "xsmall", vertical: "medium" }}
                    basis="full"
                    background="white"
                    elevation="small"
                  >
                    <Box basis="1/2" width="40%">
                      <FormField
                        name="firstName"
                        label="First Name"
                        value={order.Address.firstName}
                      />
                      <FormField
                        name="lastName"
                        label="Last Name"
                        value={order.Address.lastName}
                      />
                      <FormField
                        name="city"
                        label="City"
                        value={order.Address.city}
                      />
                      <FormField
                        name="phone"
                        label="Phone"
                        value={order.Address.phone}
                      />
                    </Box>
                    <Box basis="1/2" width="40%">
                      <FormField
                        name="street"
                        label="Street"
                        value={order.Address.street}
                      />
                      <FormField
                        name="address"
                        label="address"
                        value={order.Address.address}
                      />
                      <FormField
                        name="zipCode"
                        label="Postalcode"
                        value={order.Address.zipCode}
                      />
                    </Box>

                    <Box
                      pad={{ vertical: "large" }}
                      basis="full"
                      align="center"
                      width="80%"
                    >
                      <Text>
                        <strong>Your order id:</strong>
                        <pre>{order.guid}</pre>
                      </Text>

                      <Button
                        margin={{ vertical: "medium" }}
                        icon={<Deliver size="small" />}
                        label="Update order"
                        type="submit"
                      />
                    </Box>
                  </Box>
                </Form>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        )}
      </OrderConsumer>
    );
  }
}

export default Product;
