import React from "react";
import App, { Container } from "next/app";
import Page from "../components/Page";

import { OrderProvider } from "../components/order.context";
class PizzaParty extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <OrderProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </OrderProvider>
      </Container>
    );
  }
}

export default PizzaParty;
