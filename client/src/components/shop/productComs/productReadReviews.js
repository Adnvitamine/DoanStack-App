import { Fragment, useEffect, useState } from "react";

const ProductReadReviews = ({ productId, productName }) => {
  const [product_reviews, setProduct_reviews] = useState([]);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productcoms/product_id/${productId}`
        );
        const jsonData = await response.json();
        setProduct_reviews(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductReviews();
  }, [productId]);

  let test = new Date();
  let dateformat = Date.parse(test.toString(product_reviews.createdAt));

  return (
    <Fragment>
      {product_reviews.length === null && (
        <div className="ComponentTitle">
          <div>
            <h1>
              No review yet for
              <span style={{ color: "blue" }}>{productName}</span>
            </h1>
          </div>
        </div>
      )}
      {product_reviews.length === 1 && (
        <div className="ComponentTitle">
          <div>
            <h1>{product_reviews.length} review</h1>
          </div>
        </div>
      )}
      {product_reviews.length > 1 && (
        <div className="ComponentTitle">
          <div>
            <h1>{product_reviews.length} reviews</h1>
          </div>
        </div>
      )}
      <div>
        {product_reviews.map((review) => (
          <div key={review.id} className="reviewContainer">
            <div className="reviewInfo">
              <p>
                {review.author_avatar === "null" && (
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
                {review.author_avatar !== "null" && (
                  <img
                    src={review.author_avatar}
                    className="profile-img-card"
                    alt={review.auhtor}
                    style={{
                      width: "25px",
                      height: "25px",
                      display: "inline-block",
                      marginBottom: "0",
                      marginRight: "2px",
                    }}
                  ></img>
                )}
                <b>{review.author}</b>
              </p>
              <p>
                <b>Email: </b>
                {review.email}
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
            <div className="reviewContent">
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProductReadReviews;
