import { Component, Fragment } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EditUser from "./users/editUser";
import UserProfile from "./users/userProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
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
          <div id="TitleLink">
            <h2>No authorisation</h2>
          </div>
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
            <h2>Manage your account</h2>
          </div>
          <div className="BrowserNavbar">
            <p>{!currentUser.avatar && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="guest"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {currentUser.avatar && (
              <img
                src={currentUser.avatar}
                className="profile-img-card"
                alt={currentUser.username}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{currentUser.username} is connected.</p>
          </div>
          <div id="ProfileFrame">
            <UserProfile currentUser={currentUser} />
            <EditUser currentUser={currentUser} />
          </div>
        </Fragment>
      );
    }
  }
}
