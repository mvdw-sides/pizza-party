import { Box, Heading } from "grommet";
import React, { Component } from "react";

import FeatureBlock from "./FeatureBlock";
import css from "./hero.scss";

export default class Hero extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box className={css.hero}>
        <Box className={css.hero__titles} align="center">
          <Heading level={1}>Pizza Party</Heading>
          <Heading level={3}>The only party is a pizza party</Heading>
        </Box>

        <Box className={css.blocks}>
          {[1, 2, 4].map(idx => (
            <FeatureBlock
              key={idx}
              onClick={() => this.props.onSelectProduct(idx)}
            />
          ))}
        </Box>
      </Box>
    );
  }
}
