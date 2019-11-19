import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Users from "./User/Users";
import UserPage from "./User/UserPage";
import NotFound from "./NotFound";

class App extends Component {
  render = () => {
    return (
      <>
        <Nav />
        <div className="container">
          <Router>
            <div>
              <Switch>
                <Route path="/user/:id" component={UserPage} />
                <Route exact path="/" component={Users} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </div>
      </>
    );
  };
}

export default App;