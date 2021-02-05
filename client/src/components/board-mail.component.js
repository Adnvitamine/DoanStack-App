import React from 'react';
import { Fragment} from "react";
import authService from "../services/auth.service";
import UserService from "../services/user.service";
import MailBox from "./mails/mailbox";
import ListUsers from "./users/listUsers";

export default class BoardMail extends React.Component {
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
          <h2>Mail</h2>
        </div>
          <div className="BrowserNavbar">
            <p>
              "Send messages to members"
              {/*this.state.content*/}
            </p>
          </div>
          <ListUsers currentUser={currentUser} />
          <MailBox currentUser={currentUser} />
        </Fragment>
      );
    }
  }
}
