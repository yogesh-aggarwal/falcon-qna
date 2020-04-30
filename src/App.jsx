import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

/// Components
import NavbarComponent from "./components/Navbar/Navbar";
import HomeComponent from "./components/Home/Home";
import QuestionComponent from "./components/Question/Question";
/// Styles
import "./App.css";
import NewQuestionComponent from "./components/Question/NewQuestion";
import * as tools from "./tools";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ApolloProvider client={tools.client}>
            <NavbarComponent />
            <Switch>
              {/* For viewing questions */}
              <Route path="/" exact component={HomeComponent} />
              {/* For viewing SPECIFIC question */}
              <Route
                path="/questions/:id"
                exact
                component={QuestionComponent}
              />
              {/* For adding NEW Question */}
              <Route path="/question" exact component={NewQuestionComponent} />
            </Switch>
          </ApolloProvider>
        </div>
      </Router>
    );
  }
}

export default App;
