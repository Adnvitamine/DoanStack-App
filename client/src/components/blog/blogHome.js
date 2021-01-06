import React, { Fragment, Component } from "react";
import {  Link } from "react-router-dom";
import BlogAllArticles from "./blogAllArticles";

import UserService from "../../services/user.service";
import authService from "../../services/auth.service";

class BlogHome extends Component {
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
          <p> How I build this PERN stack web application and more</p>
        </div>
        <div id="TitleLink">
          <h1>Blog</h1>
        </div>
        <div id="BlogBody">
          <div id="BlogNav">
            <ul>
              <li>
                <Link to="/blog" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>All</b>
                </Link>
              </li>
              <li>
                <Link to="/blog/News">
                  <b>News</b>
                </Link>
              </li>
              <li>
                <Link to="/blog/FrontEnd">
                  <b>FrontEnd</b>
                </Link>
              </li>
              <li>
                <Link to="/blog/BackEnd">
                  <b>BackEnd</b>
                </Link>
              </li>
              <li>
                <Link to="/blog/Life">
                  <b>Life</b>
                </Link>
              </li>
              <li>
                <Link to="/blog/Others">
                  <b>Others</b>
                </Link>
              </li>
            </ul>
          </div>
          <div id="BlogHome">
            <BlogAllArticles currentUser={currentUser} />
          </div>
        </div>
        
      </Fragment>
    );
  }
}

export default BlogHome;
