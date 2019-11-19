import React, { Component } from "react";
import { getUser } from "../../services/UserService";
import Loader from "../Utils/Loader";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    setTimeout(
      function() {
        getUser(id).then(user =>
          this.setState({
            loading: false,
            user: user
          })
        );
      }.bind(this),
      4000
    );
  }

  render = () => {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      this.state.user && (
        <div className="row">
          <div className="col">
            <h1>{this.state.user.name}</h1>
            <a href="/">Retour à la liste</a>
          </div>
        </div>
      )
    );
  };
}

export default UserPage;
