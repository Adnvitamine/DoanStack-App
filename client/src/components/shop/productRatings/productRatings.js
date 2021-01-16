import { Fragment, useEffect, useState } from "react";

//import ProductId from "./articeId";

const ProductRatings = ({ productId }) => {
  const [product_rating, setProduct_rating] = useState([]);

  useEffect(() => {
    const getProductRatings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productRatings/product_id/${productId}`
        );
        const jsonData = await response.json();

        setProduct_rating(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProductRatings();
    //console.log(productimgs);
  }, [productId]);

  const addition = (product_rating) => {
    var oldRating = 0;

    product_rating.map((productRating) => (oldRating += productRating.rating));

    const newRating = oldRating / product_rating.length;

    if (newRating >= 1 && newRating < 2) {
      return (
        <div>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </p>
          {(product_rating.length === 1 && (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluation)`}</p>
          )) || (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluations)`}</p>
          )}
        </div>
      );
    } else if (newRating >= 2 && newRating < 3) {
      return (
        <div>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </p>
          {(product_rating.length === 1 && (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluation)`}</p>
          )) || (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluations)`}</p>
          )}
        </div>
      );
    } else if (newRating >= 3 && newRating < 4) {
      return (
        <div>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </p>
          {(product_rating.length === 1 && (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluation)`}</p>
          )) || (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluations)`}</p>
          )}
        </div>
      );
    } else if (newRating >= 4 && newRating < 5) {
      return (
        <div>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star"></i>
          </p>
          {(product_rating.length === 1 && (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluation)`}</p>
          )) || (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluations)`}</p>
          )}
        </div>
      );
    } else if (newRating >= 5) {
      return (
        <div>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
            <i className="fas fa-star" style={{ color: "orange" }}></i>
          </p>
          {(product_rating.length === 1 && (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluation)`}</p>
          )) || (
            <p
              style={{ textAlign: "center" }}
            >{`(${product_rating.length} evaluations)`}</p>
          )}
        </div>
      );
    }
  };

  return <Fragment>{addition(product_rating)}</Fragment>;
};

export default ProductRatings;
