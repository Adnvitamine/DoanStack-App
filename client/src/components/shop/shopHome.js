import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import ShopAllProducts from "./shopAllProducts";

import UserService from "../../services/user.service";
import authService from "../../services/auth.service";

class ShopHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
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
    const { currentUser } = this.state;
    return (
      <Fragment>
        <div className="BrowserNavbar">
          <p>Discover all our best deals - DoanStack.be</p>
        </div>
        <div id="TitleLink">
          <h1>Shop</h1>
        </div>
        <div id="ShopBody">
          <div id="ShopNav">
            <ul>
              <li>
                <Link to="/" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>All</b>
                </Link>
              </li>
              <li>
                <Link to="/Cosmetic">
                  <b>Cosmetic</b>
                </Link>
              </li>
              <li>
                <Link to="/Fashion">
                  <b>Fashion</b>
                </Link>
              </li>
              <li>
                <Link to="/PC">
                  <b>PC</b>
                </Link>
              </li>
              <li>
                <Link to="/Estate">
                  <b>Estate</b>
                </Link>
              </li>
              <li>
                <Link to="/Services">
                  <b>Services</b>
                </Link>
              </li>
            </ul>
          </div>
          <div id="ShopHome">
            <div id="ShopHomeProducts">
              <ShopAllProducts currentUser={currentUser} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ShopHome;
