import React, { Fragment, Component } from "react";
import HomeSVG from "./homeSVG";
import UserService from "../services/user.service";

export default class Home extends Component {
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
          <h2>Greetings, it's so nice to meet you!</h2>
        </div>
        <div className="BrowserNavbar">
          <p>"Welcome to my React Web Portfolio"</p>
        </div>
        <div className="homeBody">
          <HomeSVG />
        </div>
      </Fragment>
    );
  }
}
