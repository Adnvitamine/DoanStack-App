import React, { Fragment } from "react";
//var sanitizeHtml = require('sanitize-html');

//
const ArticleContent = ({ article }) => {
  /*.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#8221;/g, '"')
      .replace(/&#8220;/g, '"')
      .replace(' </ iframe', '</iframe')

    
  */

  /*const [articleimgs, setArticleimgs] = useState([]);



    

 useEffect(()=>{

     const getArticleimgs = async() =>{
         try {
             
             const response = await fetch(`http://localhost:8080/api/articleimgs/article_id/${article.id}`);
             const jsonData = await response.json();
 
             setArticleimgs(jsonData);
         } catch (err) {
             console.error(err.message);
         }
     };
     
     getArticleimgs();
     //console.log(articleimgs);
     
 }
 ,  [article.id]
 );*/

  //var a = '<figure class="media"><oembed url="https://www.youtube.com/watch?v=VCqA52XQlys"></oembed></figure>';
  return (
    <Fragment>
      <div className="articleContainer">
        <div className="articleHeader">
          <a href={article.image}>
            <img
              src={article.image}
              alt={article.title}
              className="articleImage"
            />
          </a>
          <div className="articleName">{article.title}</div>
          <div
            className="articleInfo"
            style={{
              padding: "10px 0px 10px 0px",
              margin: "20px 0px 0px 0px",
              borderTop: "1px solid #dee2e6",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            <div
              className="articleAuthor"
              
            >
              <p style={{ marginBottom: "0", textAlign: "center" }}>
              <b>By:</b> &nbsp;
              {article.author_avatar === "null" && (
                <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                className="user-img-card"
                alt={article.author}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-block",
                  marginBottom: "0",
                }}
              ></img>
              )}
              {article.author_avatar !== "null" && (
                <img
                src={article.author_avatar}
                className="user-img-card"
                alt={article.author}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-block",
                  marginBottom: "0",
                }}
              ></img>
              )}
               &nbsp;
                {article.author}
              </p>
            </div>
            <div
              className="articleDatum"
              
            >
              <p style={{ marginBottom: "0", textAlign: "center" }}>
                <b>Datum:</b>&nbsp;
                {new Intl.DateTimeFormat("nl-BE", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                }).format(Date.parse(article.createdAt))}
              </p>
            </div>

            {article.published === false && (
              <div
                className="articlePublish"
              >
                <p style={{ marginBottom: "0", textAlign: "center" }}>
                  <b>Status</b>&nbsp;
                  <i className="fas fa-circle" id="ProductStatusFalse"></i>
                </p>{" "}
              </div>
            )}

            {article.published === true && (
              <div
                className="articlePublish"
              >
                <p style={{ marginBottom: "0", textAlign: "center" }}>
                  <b>Status:</b>&nbsp;
                  <i className="fas fa-circle" id="ProductStatusTrue"></i>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="articleBody">
          {/*<div id="slider">
              <figure>
              {articleimgs.slice(0,5).map(articleimg =>(<img src={articleimg.path} key={articleimg.id} className="articleImage" alt="" style={{ width: "300px", height: "300px"}} />))}
              </figure>
              </div>*/}

          <div className="articleContent">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ArticleContent;
