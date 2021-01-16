import { Fragment } from "react";
import "../../assets/css/footer.css";
import "../../assets/css/contact.css";
function footer() {
  return (
    <Fragment>
      <div id="Footer">
        <div className="container-fluid navbar-fixed-bottom" id="contact-bar">
          <div id="SocialMedia">
            <ul className="list-inline text-center">
              <li>
                <a href="mailto:doan88nguyen@gmail.com">
                  <i className="fa fa-envelope rotate"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/Adnvitamine?tab=repositories">
                  <i className="fab fa-github-square"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCSx8ihkxw5dYVy-ubOyQyJQ/featured">
                  <i className="fab fa-youtube-square"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/doan88nguyen/">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/AznVitamine/">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="FooterContact">
          <div className="screen">
            <div className="screen-header"></div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT ME</span>
                </div>
                <div className="app-contact">
                  CONTACT INFO : +32/484.98.95.34
                </div>
              </div>
              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <input className="app-form-control" placeholder="NAME" />
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" placeholder="EMAIL" />
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" placeholder="TITLE" />
                  </div>
                  <div className="app-form-group message">
                    <input className="app-form-control" placeholder="MESSAGE" />
                  </div>
                  <div className="app-form-group buttons">
                    <button className="app-form-button">CANCEL</button>
                    <button className="app-form-button">SEND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default footer;
