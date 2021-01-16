import { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";

const ProductCreateRating = ({ productId, userId }) => {
  //const [product_id] = useState(productId);
  const [author_id] = useState(userId);
  const [rating, setRating] = useState();
  const history = useHistory();
  const [user_rating, setUser_rating] = useState([]);

  const deleteUserRating = async (id) => {
    try {
      const deleteUserRating = await fetch(
        `http://localhost:8080/api/productRatings/${id}`,
        {
          method: "DELETE",
        }
      );
      history.go();
      console.log(deleteUserRating);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getUserRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productRatings/product_id/${productId}/author_id/${userId}`
        );
        const jsonData = await response.json();

        setUser_rating(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getUserRating();
    //console.log(productimgs);
  }, [productId, userId]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const product_id = productId;
      const body = {
        product_id,
        author_id,
        rating,
      };
      const response = await fetch("http://localhost:8080/api/productRatings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => res.clone().json());

      //console.log(productId);
      console.log(response);
      history.go();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div>
        {user_rating.length === 0 && (
          <form onSubmit={onSubmitForm}>
            <div className="productRatingBar">
              <div className="productSubmitRating">
                <input
                  id="ProductInputFive"
                  type="radio"
                  name="radio"
                  value="5"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  id="ProductInputFour"
                  type="radio"
                  name="radio"
                  value="4"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  id="ProductInputThree"
                  type="radio"
                  name="radio"
                  value="3"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  id="ProductInputTwo"
                  type="radio"
                  name="radio"
                  value="2"
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  id="ProductInputOne"
                  type="radio"
                  name="radio"
                  value="1"
                  onChange={(e) => setRating(e.target.value)}
                />
                <div className="productRating" id="ProductStarOne">
                  <i className="fas fa-star" id="StarOne"></i>
                  <i className="fas fa-star" id="StarTwo"></i>
                  <i className="fas fa-star" id="StarThree"></i>
                  <i className="fas fa-star" id="StarFour"></i>
                  <i className="fas fa-star" id="StarFive"></i>
                </div>
              </div>
            </div>
            <button id="ProductRatingSubmit" className="btn btn-warning">
              <p>Send my rating</p>
            </button>
          </form>
        )}
        {user_rating.map((userRating) => (
          <div key={userRating.id}>
            <p>
              Your rating for this product is {userRating.rating}
              <i className="fas fa-star" style={{ color: "orange" }}></i>
            </p>
            <button
              className="btn btn-danger"
              onClick={() => deleteUserRating(userRating.id)}
            >
              <i className="far fa-trash-alt"></i> Delete my rating
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProductCreateRating;
