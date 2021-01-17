import { Fragment, useEffect, useState } from "react";

const ArticleReadComs = ({ articleId, articleName }) => {
  const [article_comments, setArticle_comments] = useState([]);

  useEffect(() => {
    const getArticleComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/articleComs/article_id/${articleId}`
        );
        const jsonData = await response.json();
        setArticle_comments(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getArticleComments();
  }, [articleId]);

  let test = new Date();
  let dateformat = Date.parse(test.toString(article_comments.createdAt));

  return (
    <Fragment>
      <div className="readComments">
      {!article_comments.length && (
        <div className="ComponentTitle">
          <div>
            <h1>
              0 comment for 
              <span style={{ color: "blue" }}> {articleName}</span>
            </h1>
          </div>
        </div>
      )}
      {article_comments.length === 1 && (
        <div className="ComponentTitle">
          <div>
            <h1>{article_comments.length} comment</h1>
          </div>
        </div>
      )}
      {article_comments.length > 1 && (
        <div className="ComponentTitle">
          <div>
            <h1>{article_comments.length} comments</h1>
          </div>
        </div>
      )}
      <div>
        {article_comments.map((comment) => (
          <div key={comment.id} className="commentContainer">
            <div className="commentInfo">
              <p>
                {comment.author_avatar === "null" && (
                  <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
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
                {comment.author_avatar !== "null" && (
                  <img
                    src={comment.author_avatar}
                    className="profile-img-card"
                    alt={comment.auhtor}
                    style={{
                      width: "25px",
                      height: "25px",
                      display: "inline-block",
                      marginBottom: "0",
                      marginRight: "2px",
                    }}
                  ></img>
                )}
                <b>{comment.author}</b>
              </p>
              <p>
                <b>Email: </b>
                {comment.email}
              </p>
              <p>
                <b>
                  {new Intl.DateTimeFormat("nl-BE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(dateformat)}
                </b>
              </p>
            </div>
            <div className="commentContent">
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Fragment>
  );
};

export default ArticleReadComs;
