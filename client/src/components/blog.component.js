import { Fragment, Component } from "react";
/*import {
  HashRouter as Router,
  Switch,
  Route,
  //BrowserRouter,
} from "react-router-dom";
*/
import BlogHome from "../components/blog/blogHome";

export default class Blog extends Component {
  render() {
    return (
      <Fragment>
              <BlogHome/>
              {/*<Route exact path={"/blog"} component={BlogHome}></Route>*/}
              {/*<Route exact path="/:category" component={BlogCateg} />
              <Route exact path="/blog/:category/:id/:title" component={BlogId} />*/}
              {/*  <Route exact path="/blog/BackEnd/:id/:title" component={BlogId} />
              <Route
                exact
                path="/blog/FrontEnd/:id/:title"
                component={BlogId}
              />
              <Route exact path="/blog/Life/:id/:title" component={BlogId} />
              <Route exact path="/blog/Others/:id/:title" component={BlogId} />
            */}
            
      </Fragment>
    );
  }
}
