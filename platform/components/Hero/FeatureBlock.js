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
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          }}
        />
        <div className={css.description}>
          <h5>Some product</h5>
          <span>Some product description</span>
        </div>
      </div>
    );
  }
}
