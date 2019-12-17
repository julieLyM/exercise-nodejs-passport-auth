import React, { Component } from "react";

import { loginData } from "../service/data";

export default class AjaxLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {}

  authUser = async e => {
    e.preventDefault();
    const data = await loginData(this.state);
  };

  onChangeInput = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Ajax Login</h1>
        <form onSubmit={this.authUser}>
          <div>
            <label>Username:</label>
            <input
              onChange={this.onChangeInput.bind(null, "username")}
              value={this.state.username}
              type="text"
              name="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              onChange={this.onChangeInput.bind(null, "password")}
              value={this.state.password}
              type="password"
              name="password"
            />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}
