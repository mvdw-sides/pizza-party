import { Anchor, Box, Stack, Text } from "grommet";
import { Basket, Cafeteria } from "grommet-icons";
import React, { Component } from "react";

import { Link } from "../../routes";
import { OrderConsumer } from "../order.context";
import css from "./header.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box flex justify="center" align="center" backgorund="brand">
        <Box
          pad={{ horizontal: "small", vertical: "large" }}
          overflow={{ horizontal: "hidden" }}
          direction="row"
          width="xlarge"
          justify="between"
        >
          <div className={css.header__logo}>
            <Link prefetch route="/">
              <Anchor href="/">
                <Cafeteria size="medium" /> Pizza.Party
              </Anchor>
            </Link>
          </div>
          <div className={css.header__cart}>
            <Link prefetch route="checkout">
              <Anchor href="/checkout">
                <Stack anchor="bottom-right">
                  <Basket size="medium" />
                  <Box background="brand" pad={{ horizontal: "xsmall" }} round>
                    <OrderConsumer>
                      {orderContext => (
                        <Text size="xsmall">{orderContext.list.length}</Text>
                      )}
                    </OrderConsumer>
                  </Box>
                </Stack>
              </Anchor>
            </Link>
          </div>
        </Box>
      </Box>
    );
  }
}
