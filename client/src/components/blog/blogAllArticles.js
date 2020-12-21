import React, { Fragment, useEffect, useState } from "react";
import "../../assets/css/blog.css";
import { Link } from "react-router-dom";


//import ArticleId from "./articeId";

const BlogAllArticles = ({ currentUser }) => {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/articles/post/published/true`
        );
        const jsonData = await response.json();
        setAllArticles(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllArticles();
  }, []);

  return (
    <Fragment>
      {allArticles.map((article) => (
        <div className="blogFrame" key={article.id}>
          <div className="blogImg">
            <img
              src={article.image}
              alt={article.titre}
              style={{ width: "100%" }}
            ></img>
          </div>
          <Link
            to={`/${article.category}/${article.id}/${article.title}`}
            id="Link"
          >
            <div className="blogBody">
              <div className="blogInfo">
                <ul>
                  <li>
                    <p>by 
                    {article.author_avatar === "null" && (
                      <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "inline-block",
                          marginBottom: "0",
                          marginRight: "2px",
                        }}
                      ></img>
                    )}
                    {article.author_avatar !== "null" && (
                      <img
                        src={article.author_avatar}
                        className="profile-img-card"
                        alt={article.author}
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "inline-block",
                          marginBottom: "0",
                          marginRight: "2px",
                        }}
                      ></img>
                    )}
                    {article.author}</p>
                  </li>
                  
                  <li>
                    <p>#{article.category}</p>
                  </li>
                  <li>
                    <p>
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(Date.parse(article.createdAt))}</p>
                  </li>
                </ul>
              </div>
              <div className="blogContent">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export default BlogAllArticles;
