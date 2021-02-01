import { Fragment } from "react";

const ContactBar = () =>{

    return(
        <Fragment>
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
        </Fragment>
    )
}

export default ContactBar;