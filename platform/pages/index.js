import { Link, Router } from "../routes";

import FeatureBlock from "../components/Hero/FeatureBlock";
import Hero from "../components/Hero";
import React from "react";
import css from "../assets/style/global.scss";

function Home() {
  return (
    <div>
      <div>
        <Hero
          onSelectProduct={id =>
            Router.pushRoute("product", { product: id.toString() })
          }
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
          {[1, 2, 4, 5, 6, 7, 8].map(idx => (
            <FeatureBlock
              key={idx}
              onClick={() =>
                Router.pushRoute("product", { id: idx.toString() })
              }
              style={{
                margin: "20px 2%",
                width: "21%",
                height: "100px"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
