import React from "react";
import {
  GlobalStateInterface,
  UserInterface,
} from "../../services/state/interfaces";
import { UserState } from "../../services/state/userState";

/// Styles
import "./Styles.scss";

/// Assets
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export class Navbar extends React.Component {
  state: UserInterface = {};

  componentDidMount() {
    UserState.state.subscribe((state: GlobalStateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="Navbar">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="" />
            <div className="text">Falcon</div>
          </div>
        </Link>

        <div className="actions">
          <div className="action">
            <Button variant="contained">Ask Question</Button>
          </div>
          <div className="user">
            <div className="profile">
              <img src={this.state.profileImg} alt="" />
              <div className="name">{this.state.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}