import { Fragment, useState } from "react";
import { useHistory } from "react-router";

const ProductCreateReview = ({ productId, user }) => {
  //const [product_id] = useState(productId);
  const history = useHistory();
  const [author_id] = useState(user.id);
  const [author] = useState(user.username);
  const [author_avatar] = useState(user.avatar);
  const [email] = useState(user.email);
  const [content, SetContent] = useState();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const product_id = productId;
      const body = {
        product_id,
        author_id,
        author,
        author_avatar,
        email,
        content,
      };
      const response = await fetch("http://localhost:8080/api/productcoms", {
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
        <form onSubmit={onSubmitForm}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Username:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={author}
                ></input>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text">Email:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={email}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                className="form-control"
                id="ReviewContent"
                style={{ width: "100%" }}
                placeholder="Write your review"
                onChange={(e) => SetContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button id="ProductReviewSubmit" className="btn btn-success">
            <i className="fas fa-paper-plane"></i> Send Review
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ProductCreateReview;
