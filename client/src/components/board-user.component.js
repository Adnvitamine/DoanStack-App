import React from 'react';
import { Fragment } from "react";
import authService from "../services/auth.service";
import UserService from "../services/user.service";
import CreateProduct from "./products/createProduct";
import ListProducts from "./products/listProducts";

export default class BoardUser extends React.Component {
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
        <div id="TitleLink">
          <h2>My product panel</h2>
        </div>
          <div className="BrowserNavbar">
            <p>
              "Manage all your products here" - DoanStack.be
              {/*this.state.content*/}
            </p>
          </div>
          <ListProducts currentUser={currentUser} />
          <CreateProduct currentUser={currentUser} />
        </Fragment>
      );
    }
  }
}
