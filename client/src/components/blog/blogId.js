import { Fragment, Component } from "react";
import BlogIdArticle from "./blogIdArticle";
import authService from "../../services/auth.service";

class BlogId extends Component {
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
          <BlogIdArticle
            articleId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <BlogIdArticle
            articleId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    }
  }
}

export default BlogId;
