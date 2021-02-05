import React from 'react';
import { Fragment } from "react";
import authService from "../services/auth.service";
import UserService from "../services/user.service";
import CreateArticle from "./articles/createArticle";
import ListArticles from "./articles/listArticles";

export default class BoardModerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
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
    } else if (currentUser.roles[1] === "Role: MODERATOR") {
      return (
        <Fragment>
        <div id="TitleLink">
          <h2>MOD PANEL</h2>
        </div>
          <div className="BrowserNavbar">
            <p>
              "Manage all your posts here" - DoanStack.be
              {/*this.state.content*/}
            </p>
          </div>
          <ListArticles currentUser={currentUser} />
          <CreateArticle currentUser={currentUser} />
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
