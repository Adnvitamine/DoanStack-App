import React from 'react';
import { Fragment } from "react";
import HomeSVG from "./homeSVG";
import UserService from "../services/user.service";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <Fragment>
        <div id="TitleLink">
          <h2>Coding from scratch!</h2>
        </div>
        <div className="BrowserNavbar">
          <p>"A fullstack developer's journey"</p>
        </div>
        <div className="homeBody">
          <HomeSVG />
        </div>
      </Fragment>
    );
  }
}
