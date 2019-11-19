import React, { Component } from "react";
import Nav from "./Nav";
import Users from "./Users";

class App extends Component {
  render = () => {
    console.log("Dans le render avant return");
    return (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col p-2">
              <h1>Utilisateurs</h1>
            </div>
          </div>
          <Users />
        </div>
      </>
    );
  };
}

export default App;
