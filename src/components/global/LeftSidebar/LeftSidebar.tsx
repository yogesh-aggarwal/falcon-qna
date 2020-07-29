import React from "react";
import { IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";

export class LeftSidebar extends React.Component {
  render() {
    return (
      <div>
        <IconButton>
          <Home />
        </IconButton>
      </div>
    );
  }
}
