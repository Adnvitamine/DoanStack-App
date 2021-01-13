import React, { Component, Fragment } from "react";
import UserService from "../services/user.service";
import Users from "./users/users";
import authService from "../services/auth.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { currentUser } = this.state;
    //console.log(currentUser.roles[2]);
    if (currentUser == null) {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No access</p>
          </div>
          <div></div>
        </Fragment>
      );
    } else if (currentUser.roles[2] === "Role: ADMIN") {
      return (
        <Fragment>
        <div id="TitleLink">
          <h2>ADMIN PANEL</h2>
        </div>
          <div className="BrowserNavbar">
            <p>"Manage registered users" - DoanStack.be</p>
          </div>
          <Users />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No role permission</p>
          </div>
        </Fragment>
      );
    }
  }
}
