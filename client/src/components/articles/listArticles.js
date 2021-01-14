import React, { Fragment, useEffect, useState } from "react";
import ViewArticle from "./viewArticle";
import EditArticle from "./editArticle";
import QuillEdit from "./quillEdit";

const ListArticles = ({ currentUser }) => {
  const [articles, setArticles] = useState([]);

  // Delete Article function
  const deleteArticle = async (id) => {
    try {
      const deleteArticle = await fetch(
        `http://localhost:8080/api/articles/${id}`,
        {
          method: "DELETE",
        }
      );
      // window.location="/";
      setArticles(articles.filter((article) => article.id !== id));
      console.log(deleteArticle);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/articles/author_id/${currentUser.id}`
        );
        const jsonData = await response.json();
        setArticles(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getArticles();
  }, [currentUser.id]);

  return (
    <Fragment>
      <div className="container text-center" id="articlesList">
        <div className="ComponentTitle">
          <div>
            <h1>
              All {currentUser.username}'s articles ({articles.length})
            </h1>
          </div>
        </div>

        {!articles.length && (
          <div className="ComponentEmpty">
            <div>Empty</div>
          </div>
        )}

        {articles.map((article) => (
          <div className="articleCard" key={article.id}>
            <div className="articleCardName">
              <p>
                {article.published === false && (
                  <i className="fas fa-circle" id="miniStatusFalse"></i>
                )}
                {article.published === true && (
                  <i className="fas fa-circle" id="miniStatusTrue"></i>
                )}
                {article.title}
              </p>
            </div>
            <div className="articleCardImage">
              <img
                id="articleCardImage"
                src={article.image}
                alt={article.title}
                style={{ width: "100%" }}
              />
            </div>
            <div className="articleCardContent">
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="articleCardInfo">
              <div className="infoAuthor">
                Author: <b>{article.author}</b>
              </div>
            </div>
            <div className="articleCardInfo">
              <div className="infoDate">
                Date:{" "}
                <b>
                  {new Intl.DateTimeFormat("nl-BE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(Date.parse(article.createdAt))}
                </b>
              </div>
            </div>
            <div className="articleCardAction">
              <ViewArticle article={article} />
              <EditArticle article={article} />
              <QuillEdit article={article} />
              {/*
                        <EditArticle article={article} />*/}
              <button
                id="miniDeleteButton"
                onClick={() => deleteArticle(article.id)}
              >
                <i className="far fa-trash-alt"></i>
                <p>Delete</p>
              </button>
            </div>
          </div>

          /*
                        
                        
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.image}</td>
                            <td>{product.category}</td>
                            <td>{product.price}$</td>
                            <td>{product.vendor}</td>
                            {product.status === false &&
                            <td>Waiting</td>
                            }
                            {product.status === true &&
                            <td>On Sale</td>
                            }
                            <td><ViewProduct product={product} /></td>                      
                            <td><EditProduct product={product} /></td>
                            <td><button id="miniDeleteButton" onClick={()=> deleteProduct(product.id)} ><i className="las la-trash-alt"><p>Delete</p></i></button></td>
                         
                        </tr>
                        
                        
                        
                        
                        
                        
                        */
        ))}
      </div>
    </Fragment>
  );
};

export default ListArticles;
