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
          <h2>{this.props.match.params.category}</h2>
        </div>
        <div id="ShopBody">
          <div id="ShopNav">
            <ul>
              <li>
                <Link to="/shop">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "Cosmetic" && (
                  <Link to="/shop/Cosmetic" style={{ fontSize: "20px",color: "rgb(0, 162, 255)" }}>
                    <b>Cosmetic</b>
                  </Link>
                )) || (
                  <Link to="/shop/Cosmetic">
                    <b>Cosmetic</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Fashion" && (
                  <Link to="/shop/Fashion" style={{ fontSize: "20px",color: "rgb(0, 162, 255)" }}>
                    <b>Fashion</b>
                  </Link>
                )) || (
                  <Link to="/shop/Fashion">
                    <b>Fashion</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "PC" && (
                  <Link to="/shop/PC" style={{ fontSize: "20px",color: "rgb(0, 162, 255)" }}>
                    <b>Pc</b>
                  </Link>
                )) || (
                  <Link to="/shop/PC">
                    <b>Pc</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Estate" && (
                  <Link to="/shop/Estate" style={{ fontSize: "20px",color: "rgb(0, 162, 255)" }}>
                    <b>Estate</b>
                  </Link>
                )) || (
                  <Link to="/shop/Estate">
                    <b>Estate</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Services" && (
                  <Link to="/shop/Services" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Services</b>
                  </Link>
                )) || (
                  <Link to="/shop/Services">
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
