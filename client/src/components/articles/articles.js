import { Fragment } from "react";
import CreateArticle from "./createArticle";
import ListArticles from "./listArticles";

function Articles({ currentUser }) {
  return (
    <Fragment>
      <ListArticles currentUser={currentUser} />
      <CreateArticle currentUser={currentUser} />
    </Fragment>
  );
}

export default Articles;
