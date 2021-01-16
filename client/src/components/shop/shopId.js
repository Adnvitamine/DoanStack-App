import { Fragment, Component } from "react";
import ShopIdProduct from "./shopIdProduct";
import authService from "../../services/auth.service";

class ShopId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  render() {
    const user = this.state.currentUser;
    if (user == null) {
      const user = "Visitor";
      return (
        <Fragment>
          <ShopIdProduct
            productId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <ShopIdProduct
            productId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    }
  }
}

export default ShopId;
