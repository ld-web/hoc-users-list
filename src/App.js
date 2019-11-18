import React from "react";
import Nav from "./Nav";
import Axios from "axios";

const App = () => {
  let users = [];

  Axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      console.log("Première promesse avant affectation users", users);
      users = res.data;
    })
    .then(() => {
      console.log("Deuxième promesse", users);
    });

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <h1>Utilisateur</h1>
      </div>
    </>
  );
};

export default App;
