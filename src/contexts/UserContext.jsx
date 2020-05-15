import React, { createContext, Component } from "react";

export const UserContext = createContext({});

export default class UserProvider extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
        "he": "s"
    };
  }
  render() {
    return (
      <UserContext.Provider value={{ setState: this.setState, ...this.state }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
