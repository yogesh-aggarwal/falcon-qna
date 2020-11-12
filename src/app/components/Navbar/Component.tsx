import React from "react";
import { UserInterface } from "../../services/state/interfaces";
import { UserState } from "../../services/state/userState";

/// Styles
import "./Styles.scss";

/// Assets
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AuthService } from "../../services/auth/auth";

export class Navbar extends React.Component {
  state: UserInterface = {};

  componentDidMount() {
    UserState.state.subscribe((user: UserInterface) => {
      this.setState(user);
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
          <div className="user" onClick={AuthService.signIn}>
            {this.state.id && (
              <div className="profile">
                <img src={this.state.profileImg} alt="" />
                <div className="name">{this.state.name}</div>
              </div>
            )}
            {!this.state.id && <Button variant="contained">Login</Button>}
          </div>
        </div>
      </div>
    );
  }
}
