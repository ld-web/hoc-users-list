import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  render = () => {
    const { users } = this.props;
    return users.map(user => (
      <User name={user.name} email={user.email} key={user.id} />
    ));
  };
}

export default UserList;
