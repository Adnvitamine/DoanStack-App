import { Fragment, Component } from "react";
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
        <div id="TitleLink">
          <h2>Blog</h2>
        </div>
        <div className="BrowserNavbar">
          <p>All my topics about PERNstack Application.</p>
        </div>
        <div id="BlogBody">
          <div id="BlogNav">
            <ul>
              <li>
                <Link to="/blog" style={{ color: "rgb(0, 162, 255)" }}>
                  <b style={{ fontSize: "18px", color: "rgb(0, 162, 255)"}}>All</b>
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
