import React from "react";

// import React, { Component } from "react";

// Définition sous forme de classe
// class User extends Component {
//   render = () => {
//     const { name, email } = this.props;

//     return <div className="col-12 col-lg-4">
//       {name} / {email}
//     </div>;
//   };
// }

// Définition sous forme de fonction
const User = ({ id, name, email }) => (
  <div className="col-12 col-lg-4 p-2 border">
    <p>{name}</p>
    <p>{email}</p>
    <p>
      <a href={`/user/${id}`} className="btn btn-sm btn-primary">Voir la fiche</a>
    </p>
  </div>
);

export default User;
