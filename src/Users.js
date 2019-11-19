import React, { Component } from "react";
import { getUsers } from "./UserService";
import Search from "./Search";
import UserList from "./UserList";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearch: [],
      search: ""
    };
    this.users = [];
  }

  componentDidMount = () => {
    getUsers().then(users => {
      this.users = users;
      this.setState({
        userSearch: users
      });
    });
  };

  search = e => {
    const search = e.target.value;
    let userSearch = this.users;

    if (search !== "") {
      userSearch = this.users.filter(user => user.name.includes(search));
    }

    this.setState({
      userSearch: userSearch,
      search: search
    });
  };

  render = () => {
    return (
      <>
        <Search handleChange={this.search} searchTerm={this.state.search} />
        <div className="row mt-2">
          <UserList users={this.state.userSearch} />
        </div>
      </>
    );
  };
}

export default Users;