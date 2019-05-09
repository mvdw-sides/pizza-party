import * as axios from "axios";

import {
  Box,
  Button,
  Image,
  Markdown,
  ResponsiveContext,
  Select,
  Text,
  TextInput
} from "grommet";
import React, { Component } from "react";

import { Basket } from "grommet-icons";
import { OrderConsumer } from "../components/order.context";
import { getRandomImage } from "../components/pizzaImage";

class Product extends Component {
  static async getInitialProps({ query, req }) {
    try {
      const api = !!req ? "http://api:7002" : "http://api.local.test";
      const { data: product } = await axios.get(`${api}/products/${query.id}`);
      const image = getRandomImage();

      return { ...query, product, image };
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      product: props.product || {},
      quantity: 1,
      selected: props.product.ProductVariations[0] || {},
      submit: false
    };
  }

  render() {
    const { quantity, product, selected, submit } = this.state;
    const options = product.ProductVariations;

    return (
      <OrderConsumer>
        {orderContext => (
          <ResponsiveContext.Consumer>
            {size => (
              <Box direction="row" wrap justify="between">
                <Box width="65%" align="center">
                  <Box direction="column" justify="between">
                    <Box pad="medium">
                      <Text size="xlarge">{product.name}</Text>
                    </Box>
                    <Box
                      height="medium"
                      fill
                      align="center"
                      justify="between"
                      pad="small"
                      overflow="hidden"
                    >
                      <Image fit="contain" src={this.props.image} />
                    </Box>
                    <Box pad="medium" fill>
                      <Markdown>{product.description}</Markdown>
                    </Box>
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
                  <Text margin={{ vertical: "small" }} size="large">
                    Options
                  </Text>
                  <Select
                    icon={true}
                    options={options.map(o => (
                      <Box key={o.id} fill>
                        <Text>
                          {o.name} (${o.price / 100})
                        </Text>
                      </Box>
                    ))}
                    value={`${selected.name} ($${selected.price / 100})`}
                    onChange={({ value }) => {
                      const filtered = options.filter(o => {
                        return o.id == value.key;
                      });
                      if (filtered.length) {
                        this.setState({
                          selected: filtered[0]
                        });
                      }
                    }}
                  />
                  <Text margin={{ vertical: "small" }} size="small">
                    {selected.name}
                    {selected.description}
                  </Text>
                  <Text margin={{ vertical: "small" }} size="medium">
                    Quantity
                  </Text>
                  <TextInput
                    type="number"
                    min={1}
                    max={15}
                    value={quantity}
                    onChange={event =>
                      this.setState({ quantity: event.target.value })
                    }
                  />

                  <Box pad={{ vertical: "large" }} align="center">
                    {submit ? (
                      <Box
                        animation="slideUp"
                        background="brand"
                        width="medium"
                        round="medium"
                        pad="small"
                        align="center"
                        justify="center"
                      >
                        <Text>Added to cart!</Text>
                      </Box>
                    ) : (
                      <Button
                        icon={<Basket size="small" />}
                        label="Put in basket"
                        onClick={() => {
                          orderContext.add({
                            id: `${product.id}.${selected.id}`,
                            name: `${product.name} - ${selected.name}`, // the name
                            quantity, // the amount
                            pricePerItem: selected.price, // just for displaying sake
                            productId: product.id, // we need the original product id
                            variationId: selected.id // we need the variation
                          });
                          this.setState({ submit: true });
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        )}
      </OrderConsumer>
    );
  }
}

export default Product;
