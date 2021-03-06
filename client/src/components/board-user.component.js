import React, { Fragment, Component } from "react";
import Products from "./products/products";
import authService from "../services/auth.service";
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
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

    if (currentUser == null) {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No access</p>
          </div>
          <div></div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>
              "Manage all your products here" - DoanStack.be
              {/*this.state.content*/}
            </p>
          </div>
          <div id="TitleLink">
            <h1>USER PANEL</h1>
          </div>
          <Products currentUser={currentUser} />
        </Fragment>
      );
    }
  }
}
