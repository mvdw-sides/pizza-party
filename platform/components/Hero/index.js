import { Box, Heading } from "grommet";
import React, { Component } from "react";

import FeatureBlock from "./FeatureBlock";
import css from "./hero.scss";

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products || []
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.products.length !== props.products.length) {
      this.setState({ products: props.products });
    }
  }
  render() {
    const { products } = this.state;
    return (
      <Box className={css.hero}>
        <Box className={css.hero__titles} align="center">
          <Heading level={1}>Pizza Party</Heading>
          <Heading level={3}>The only party is a pizza party</Heading>
        </Box>

        <Box className={css.blocks}>
          {products.map(product => (
            <FeatureBlock
              key={product.id}
              product={product}
              onClick={() => this.props.onSelectProduct(product.id)}
            />
          ))}
        </Box>
      </Box>
    );
  }
}
