import React, { Fragment, Component } from "react";
import authService from "../services/auth.service";
import UserService from "../services/user.service";
import Articles from "../components/articles/articles";

export default class BoardModerator extends Component {
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
          <div className="BrowserNavbar">
            <p>
              "Manage all your posts here" - DoanStack.be
              {/*this.state.content*/}
            </p>
          </div>
          <div id="TitleLink">
            <h1>MOD PANEL</h1>
          </div>
          <Articles currentUser={currentUser} />
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
