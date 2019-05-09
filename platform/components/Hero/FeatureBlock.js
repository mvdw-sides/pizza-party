import React, { Component } from "react";

import css from "./featureBlock.scss";
import { getRandomImage } from "../pizzaImage";

export default class FeatureBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product || {}
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.product.id !== props.product.id) {
      this.setState({ product: props.product });
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div
        className={css.block}
        onClick={this.props.onClick}
        style={this.props.style || {}}
      >
        <div
          className={css.image}
          style={{
            backgroundImage: `url(${getRandomImage()})`
          }}
        />
        <div className={css.description}>
          <h5>{product.name}</h5>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
}
