import React from "react";
import "./Navbar.scss";
import { StateInterface } from "../../data/interfaces/data";
import { UserState } from "../../data/userState";
import { UserInterface } from "../../data/interfaces/user";

/// Assets
import logo from "../../assets/logo.jpg";

export class Navbar extends React.Component {
  state: UserInterface = {};

  componentDidMount() {
    UserState.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
          <div className="text">Falcon</div>
        </div>
        <div className="user">
          <div className="profile">
            <img src={this.state.profileImg} alt="" />
            <div className="name">{this.state.name}</div>
          </div>
        </div>
      </div>
    );
  }
}
