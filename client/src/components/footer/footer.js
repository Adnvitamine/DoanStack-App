import { Fragment } from "react";
import ContactBar from "./contactBar";
import ContactFooter from "./contactFooter";

const Footer = () => {
  return (
    <Fragment>
      <div id="Footer">
        <ContactBar />
        <ContactFooter />        
      </div>
    </Fragment>
  );
}

export default Footer;
