import { Box, Collapsible, Grommet, ResponsiveContext } from "grommet";
import React, { Component } from "react";

import Footer from "../Footer";
import { FormClose } from "grommet-icons";
import Header from "../Header";
import css from "./page.scss";
import { grommet as theme } from "grommet/themes";

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grommet theme={theme} full background="#FBFBFB">
        <ResponsiveContext.Consumer>
          {size => (
            <Box>
              <Box>
                <Header />
              </Box>
              <Box flex justify="center" align="center">
                <Box overflow={{ horizontal: "hidden" }} width="xlarge">
                  {this.props.children}
                </Box>
              </Box>

              <Box>
                <Footer />
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}
