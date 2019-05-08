import React, { Component } from "react";
import css from "./featureBlock.scss";
export default class FeatureBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={css.block}
        onClick={this.props.onClick}
        style={this.props.style || {}}
      >
        <div
          className={css.image}
          style={{ backgroundImage: "url(/static/images/input1.jpg)" }}
        />
        <div className={css.description}>
          <h5>Some product</h5>
          <span>Some product description</span>
        </div>
      </div>
    );
  }
}
