/// Styles
import "./Styles.scss";

import React from "react";
import { IconButton } from "@material-ui/core";
import {
  Home,
  TrendingUp,
  HomeOutlined,
  TrendingUpOutlined,
} from "@material-ui/icons";
import { withRouter, Link } from "react-router-dom";

@(withRouter as any)
export class LeftSidebar extends React.Component {
  state: { currentRoute: string } = { currentRoute: "home" };

  componentDidUpdate(prevProps: any) {
    if ((this.props as any).location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged((this.props as any).location.pathname);
    }
  }

  onRouteChanged(newPath: string) {
    let currentRoute = newPath.split("/")[1];
    if (!currentRoute) {
      currentRoute = "home";
    }

    this.setState({ currentRoute: currentRoute });
  }

  render() {
    return (
      <div className="LeftSidebar">
        <Link to="/">
          <IconButton>
            {this.state.currentRoute === "home" && <Home className="icon" />}
            {this.state.currentRoute !== "home" && (
              <HomeOutlined className="icon" />
            )}
          </IconButton>
        </Link>
        <Link to="/trending">
          <IconButton>
            {this.state.currentRoute === "trending" && (
              <TrendingUp className="icon" />
            )}
            {this.state.currentRoute !== "trending" && (
              <TrendingUpOutlined className="icon" />
            )}
          </IconButton>
        </Link>
      </div>
    );
  }
}
