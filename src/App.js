import React, { Component } from "react";
import Nav from "./Nav";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("Construction du composant");
    // Le constructeur est le seul endroit où on peut manipuler directement le state
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    console.log("Component did mount : appel API")
    Axios.get("https://jsonplaceholder.typicode.com/users").then(res =>
      // Dans toutes les autres méthodes, on utilisera this.setState
      this.setState({
        users: res.data
      })
    );
  };

  render = () => {
    const { users } = this.state;

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
          <div className="row">
            {users.map(user => (
              <div className="col-12 col-lg-4" key={user.id}>
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
}

export default App;
