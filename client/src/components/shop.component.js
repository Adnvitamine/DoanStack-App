import React, { Fragment, Component } from "react";
import ShopHome from "../components/shop/shopHome";

export default class Shop extends Component {
  render() {
    return (
      <Fragment>
        <ShopHome />
        {/*<HashRouter>
          <Router>
            <Switch>
              <Route exact path={["/", "/shop"]} component={ShopHome}></Route>
              <Route exact path="/:category" component={ShopCateg} />
              <Route exact path="/:category/:id/:title" component={ShopId} />
              
              <Route
                exact
                path="/shop/:category/:id/:title"
                component={ShopId}
              />
            </Switch>
          </Router>
        </HashRouter>*/}
      </Fragment>
    );
  }
}
