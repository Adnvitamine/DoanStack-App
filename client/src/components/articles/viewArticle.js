import { Fragment } from "react";
import ArticleContent from "./articleContent";

const ViewArticle = ({ article }) => {
  return (
    <Fragment>
      <button
        type="button"
        id="miniViewButton"
        data-toggle="modal"
        data-target={`#id${article.id}`}
      >
        <i className="fas fa-eye"></i> <p>View</p>
      </button>

      <div className="modal" id={`id${article.id}`}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">
                {article.category}/ {article.title}
              </h1>
              <button type="button" id="closeButton" data-dismiss="modal">
                <i className="far fa-times-circle"></i>
              </button>
            </div>

            <div className="modal-body">
              <ArticleContent article={article} />
            </div>

            <div className="modal-footer">
              <button type="button" id="closeButton" data-dismiss="modal">
                <i className="far fa-times-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewArticle;
