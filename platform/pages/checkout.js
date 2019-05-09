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
  TableHeader,
  TableRow
} from "grommet";
import { Deliver, FormClose } from "grommet-icons";
import React, { Component } from "react";

import { OrderConsumer } from "../components/order.context";
import { Router } from "../routes";
import css from "../assets/style/global.scss";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.submit = this.submit.bind(this);
  }

  async submit(event, products) {
    event.preventDefault();
    const object = { address: event.value };

    object.products = products.map(product => {
      return { id: product.variationId, quantity: product.quantity };
    });

    const { data: response } = await axios.post(
      "http://api.local.test/orders",
      object
    );
    return response;
  }

  render() {
    let total = 0;
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
                            Product
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Quantity
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Price
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Total
                          </TableCell>
                          <TableCell scope="col" border="bottom" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderContext.list.map((record, idx) => {
                          total |=
                            total + record.pricePerItem * record.quantity;
                          return (
                            <TableRow key={idx}>
                              <TableCell scope="row">{record.name}</TableCell>
                              <TableCell scope="row">
                                {record.quantity}
                              </TableCell>
                              <TableCell scope="row">
                                ${record.pricePerItem / 100}
                              </TableCell>
                              <TableCell scope="row">
                                ${(record.pricePerItem * record.quantity) / 100}
                              </TableCell>
                              <TableCell>
                                <Button
                                  icon={<FormClose size="small" />}
                                  onClick={() => orderContext.remove(record.id)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow key="totals">
                          <TableCell scope="row" />
                          <TableCell scope="row" />
                          <TableCell scope="row" />
                          <TableCell border="top" scope="row">
                            <strong>${total / 100}</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
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
                  <Form
                    onSubmit={async e => {
                      e.preventDefault();
                      const { guid } = this.submit(e, orderContext.list);
                      orderContext.set([]);
                      Router.push("orders", { id: guid });
                    }}
                  >
                    <FormField name="firstName" label="First Name" />
                    <FormField name="lastName" label="Last Name" />
                    <FormField name="city" label="City" />
                    <FormField name="street" label="Street" />
                    <FormField name="address" label="address" />
                    <FormField name="zipCode" label="Postalcode" />
                    <FormField name="phone" label="Phone" />
                    <Box pad={{ vertical: "large" }} align="center">
                      <Button
                        icon={<Deliver size="small" />}
                        label="Place order"
                        type="submit"
                      />
                    </Box>
                  </Form>
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        )}
      </OrderConsumer>
    );
  }
}

export default Checkout;
