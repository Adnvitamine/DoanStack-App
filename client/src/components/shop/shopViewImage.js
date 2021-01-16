import { Fragment } from "react";
const ShopViewImage = ({ product, productImage }) => {
  return (
    <Fragment>
      <button
        type="button"
        id="ShopProductZoom"
        data-toggle="modal"
        data-target={`#id${product.id}`}
      >
        <i className="fas fa-search-plus"></i>
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
              <img src={productImage} alt={product.name} id="ModalImage"></img>
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

export default ShopViewImage;
