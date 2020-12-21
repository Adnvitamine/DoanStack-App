import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import ShopProductsCateg from "./shopProductsCateg";

class shopCateg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <Fragment>
        <div className="BrowserNavbar">
          <p>
            All our best {this.props.match.params.category}'s deals -
            DoanStack.be
          </p>
        </div>
        <div id="TitleLink">
          <h1>{this.props.match.params.category}</h1>
        </div>
        <div id="ShopBody">
          <div id="ShopNav">
            <ul>
              <li>
                <Link to="/">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "Cosmetic" && (
                  <Link to="/Cosmetic" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Cosmetic</b>
                  </Link>
                )) || (
                  <Link to="/Cosmetic">
                    <b>Cosmetic</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Fashion" && (
                  <Link to="/Fashion" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Fashion</b>
                  </Link>
                )) || (
                  <Link to="/Fashion">
                    <b>Fashion</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "PC" && (
                  <Link to="/PC" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>PC</b>
                  </Link>
                )) || (
                  <Link to="/PC">
                    <b>PC</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Estate" && (
                  <Link to="/Estate" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Estate</b>
                  </Link>
                )) || (
                  <Link to="/Estate">
                    <b>Estate</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Services" && (
                  <Link to="/Services" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Services</b>
                  </Link>
                )) || (
                  <Link to="/Services">
                    <b>Services</b>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div id="ShopHome">
            <div id="ShopHomeProducts">
              <ShopProductsCateg category={this.props.match.params.category} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default shopCateg;
