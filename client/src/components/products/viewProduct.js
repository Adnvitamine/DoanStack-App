import { Fragment } from "react";
import ProductDescription from "./productDescription";

const ViewProduct = ({ product }) => {
  return (
    <Fragment>
      <button
        type="button"
        id="miniViewButton"
        data-toggle="modal"
        data-target={`#id${product.id}`}
      >
        <i className="fas fa-eye"></i> <p>View</p>
      </button>

      <div className="modal" id={`id${product.id}`}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">
                {product.category} / {product.name}
              </h1>
              <button type="button" id="closeButton" data-dismiss="modal">
                <i className="far fa-times-circle"></i>
              </button>
            </div>

            <div className="modal-body">
              <ProductDescription product={product} />
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

export default ViewProduct;
