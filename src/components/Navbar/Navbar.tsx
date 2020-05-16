import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

class NavbarComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="left"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <Typography variant="h6">Falcon</Typography>
              </Link>
            </div>
            <div className="right">
              <TextField
                id="outlined-basic"
                label="Search Question"
                variant="outlined"
                size="small"
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavbarComponent;
