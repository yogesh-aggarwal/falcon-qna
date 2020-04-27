import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

/// Components
import NavbarComponent from "./components/Navbar";
import HomeComponent from "./components/Home";
import QuestionComponent from "./components/Question";
/// Styles
import "./App.css";

class App extends Component {
  client = new ApolloClient({
    uri: "http://localhost",
  });

  render() {
    return (
      <Router>
        <div>
          <ApolloProvider client={this.client}>
            <NavbarComponent />
            <Switch>
              <Route path="/" exact component={HomeComponent} />
              <Route path="/question/:id" exact component={QuestionComponent} />
            </Switch>
          </ApolloProvider>
        </div>
      </Router>
    );
  }
}

export default App;
