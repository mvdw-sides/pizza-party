import FeatureBlock from "../components/Hero/FeatureBlock";
import Hero from "../components/Hero";
import React from "react";
import { Router } from "../routes";
import axios from "axios";
class Home extends React.Component {
  static async getInitialProps({ query, req }) {
    try {
      const api = !!req ? "http://api:7002" : "http://api.local.test";
      const { data: products } = await axios.get(`${api}/products`);

      return { ...query, products };
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      products: props.products || []
    };
  }

  render() {
    const { products } = this.state;
    let prod = [...products];
    const heroProducts = prod.splice(0, 3);

    return (
      <div>
        <div>
          <Hero
            products={heroProducts}
            onSelectProduct={id => Router.pushRoute("product", { id })}
          />
        </div>

        <div>
          <h4
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: 100
            }}
          >
            Or order one of the others
          </h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start"
            }}
          >
            {prod.map((product, idx) => (
              <FeatureBlock
                key={`overview_${idx}`}
                onClick={() =>
                  Router.pushRoute("product", { id: product.id.toString() })
                }
                product={product}
                style={{
                  margin: "20px 1%",
                  width: "22%",
                  height: "100px"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
