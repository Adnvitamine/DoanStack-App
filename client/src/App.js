import React, { Fragment, Component } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import "./assets/css/editor.css";
import "./assets/css/buttons.css";
import "./assets/css/products.css";
import "./assets/css/users.css";
import "./assets/css/all.css";
import "./assets/css/profile.css";
import "./assets/css/home.css";
import "./assets/css/articles.css";
import "./assets/css/nav.css";
import "./assets/css/blog.css";
import "./assets/css/shop.css";
import "./assets/css/media.css";
//import './css/line-awesome.css';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AboutMe from "./components/aboutMe.component";
import ContactMe from "./components/contactMe.component";
import Blog from "./components/blog.component";
import BlogCateg from "./components/blog/blogCateg";
import BlogId from "./components/blog/blogId";
import Shop from "./components/shop.component";
import ShopCateg from "./components/shop/shopCateg";
import ShopId from "./components/shop/shopId";
import Footer from "./components/footer/footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("Role: MODERATOR"),
        showAdminBoard: user.roles.includes("Role: ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Fragment>
            <input id="switch" type="checkbox" />
            <div id="FullFrame">
              <nav className="navbar navbar-expand" id="fixedNavbar">
                <Link to={"/"} className="navbar-brand" id="LogoNav">
                  <div className="DoanStackLogo">
                    <div className="DoanStackLogoImg"></div>
                    <div className="DoanStackLogoName">
                      <p id="LogoText">DoanStack</p>
                    </div>
                  </div>
                </Link>
                <div className="navbar-nav mr-auto" id="leftMenu">
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/blog"} className="nav-link">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/shop"} className="nav-link">
                      Shop
                    </Link>
                  </li>
                </div>
                <div id="MobileMenu">
                  <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    {currentUser ? (
                      <ul id="menu">
                        <li className="mobilenav-item" id="MobileHome">
                          <Link to={"/home"} className="nav-link">
                            Home
                          </Link>
                        </li>
                        <li className="mobilenav-item" id="MobileBlog">
                          <Link to={"/blog"} className="nav-link">
                            Blog
                          </Link>
                        </li>
                        <li className="mobilenav-item" id="MobileShop">
                          <Link to={"/shop"} className="nav-link">
                            Shop
                          </Link>
                        </li>

                        {showModeratorBoard && (
                          <li className="mobilenav-item">
                            <Link to={"/mod"} className="nav-link">
                              Mod
                            </Link>
                          </li>
                        )}

                        {showAdminBoard && (
                          <li className="mobilenav-item">
                            <Link to={"/admin"} className="nav-link">
                              Admin
                            </Link>
                          </li>
                        )}

                        {currentUser && (
                          <li className="mobilenav-item">
                            <Link to={"/user"} className="nav-link">
                              User
                            </Link>
                          </li>
                        )}
                        <li className="mobilenav-item">
                          <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                          </Link>
                        </li>
                        <li className="mobilenav-item">
                          <a
                            href="/login"
                            className="nav-link"
                            onClick={this.logOut}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul id="menu">
                        <li className="mobilenav-item" id="MobileHome">
                          <Link to={"/home"} className="nav-link">
                            Home
                          </Link>
                        </li>
                        <li className="mobilenav-item" id="MobileBlog">
                          <Link to={"/blog"} className="nav-link">
                            Blog
                          </Link>
                        </li>
                        <li className="mobilenav-item" id="MobileShop">
                          <Link to={"/shop"} className="nav-link">
                            Shop
                          </Link>
                        </li>
                        <li className="mobilenav-item">
                          <Link to={"/login"} className="nav-link">
                            Login
                          </Link>
                        </li>

                        <li className="mobilenav-item">
                          <Link to={"/register"} className="nav-link">
                            Register
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {currentUser ? (
                  <div className="navbar-nav ml-auto" id="rightMenu">
                    {showModeratorBoard && (
                      <li className="nav-item">
                        <Link to={"/mod"} className="nav-link">
                          Mod
                        </Link>
                      </li>
                    )}

                    {showAdminBoard && (
                      <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                          Admin
                        </Link>
                      </li>
                    )}

                    {currentUser && (
                      <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                          User
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/home"
                        className="nav-link"
                        onClick={this.logOut}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto" id="rightMenu">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Register
                      </Link>
                    </li>
                  </div>
                )}
                <label htmlFor="switch" id="Label">
                  <div className="toggle"></div>
                  <div className="names">
                    <p className="light">Light</p>
                    <p className="dark">Dark</p>
                  </div>
                </label>
              </nav>

              <div className="mainBoard">
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/blog" component={Blog} />
                  <Route exact path="/blog/:category" component={BlogCateg} />
                  <Route exact path="/blog/:category/:id/:title" component={BlogId} />
                  <Route exact path="/shop" component={Shop} />
                  <Route exact path="/shop/:category" component={ShopCateg} />
                  <Route exact path="/shop/:category/:id/:title" component={ShopId} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/user" component={BoardUser} />
                  <Route path="/mod" component={BoardModerator} />
                  <Route path="/admin" component={BoardAdmin} />
                  <Route path="/contact" component={ContactMe} />
                  <Route path="/about" component={AboutMe} />
                </Switch>
              </div>
              <Footer />
            </div>
      </Fragment>
    );
  }
}

export default App;
