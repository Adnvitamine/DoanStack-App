import React, { Fragment, useEffect, useState } from "react";
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
      <div className="dataFilter" style={{ width: "100%", border: "1px solid black", minHeight: "50px", display: "flex", flexDirection: "row", flexWrap: "wrap"}} >
        
      </div>
      {allArticles.map((article) => (
        <div className="blogFrame" key={article.id}>
          <div className="blogInfo">
                <ul>
                  <li>
                    <b>by 
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
                    {article.author}</b>
                  </li>
                  
                  <li>
                    <b>#{article.category}</b>
                  </li>
                  <li>
                    <b>
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(Date.parse(article.createdAt))}</b>
                  </li>
                </ul>
              </div>
          <div className="blogArticle">
            <div className="blogImg">
              <img
                src={article.image}
                alt={article.titre}
                style={{ width: "100%" }}
              ></img>
            </div>
            <Link
              to={`/blog/${article.category}/${article.id}/${article.title}`}
              id="Link"
            >
              <div className="blogBody">
                <div className="blogContent">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default BlogAllArticles;
