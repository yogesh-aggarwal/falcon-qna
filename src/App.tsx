import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { QuestionContextProvider } from "./contexts/QuestionContext";
import * as tools from "./tools";

/// Styles
import "./App.css";

/// Components
import Home from "./components/Home/Home";
import NavbarComponent from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ApolloProvider client={tools.client}>
            <NavbarComponent />
            <Switch>
              {/* For viewing questions */}
              <QuestionContextProvider>
                <Route path="/" exact component={Home} />
              </QuestionContextProvider>
              {/* For viewing SPECIFIC question */}
              {/* <Route
                path="/questions/:id"
                exact
                component={QuestionComponent}
              /> */}
              {/* For adding NEW Question */}
              {/* <Route path="/question" exact component={NewQuestionComponent} /> */}
            </Switch>
          </ApolloProvider>
        </div>
      </Router>
    );
  }
}

export default App;
