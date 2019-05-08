import { Anchor, Box, Text } from "grommet";
import { Github, Linkedin, Yoga } from "grommet-icons";
import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box flex justify="center" align="center" backgorund="brand">
        <Box
          pad={{ horizontal: "small", vertical: "large" }}
          overflow={{ horizontal: "hidden" }}
          direction="row"
          width="xlarge"
          justify="between"
        >
          <Box>
            <Anchor href="https://github.com/mattivdweem">
              <Yoga size="medium" />
              Matti van de Weem
            </Anchor>
          </Box>
          <Box flex direction="row" justify="end" gap="xsmall">
            <Anchor href="https://github.com/mattivdweem">
              <Linkedin size="medium" />
            </Anchor>
            <Anchor href="https://github.com/mattivdweem">
              <Github size="medium" />
            </Anchor>
          </Box>
        </Box>
      </Box>
    );
  }
}
