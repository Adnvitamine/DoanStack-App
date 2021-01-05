import React, { Fragment, useEffect, useState } from "react";
//var sanitizeHtml = require('sanitize-html');

//
const ProductDescription = ({ product }) => {
  /*.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#8221;/g, '"')
      .replace(/&#8220;/g, '"')
      .replace(' </ iframe', '</iframe')

    
  */

  const [productimgs, setProductimgs] = useState([]);

  useEffect(() => {
    const getProductimgs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productimgs/product_id/${product.id}`
        );
        const jsonData = await response.json();

        setProductimgs(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProductimgs();
    //console.log(productimgs);
  }, [product.id]);

  //var a = '<figure class="media"><oembed url="https://www.youtube.com/watch?v=VCqA52XQlys"></oembed></figure>';
  return (
    <Fragment>
      <div className="productContainer">
        <div className="productHeader">
          <a href={product.image}>
            <img
              src={product.image}
              alt={product.name}
              className="productImage"
            />
          </a>
          <div className="productName">{product.name}</div>
          <div
            id="ProductInfo"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div id="ProductInfoTop" style={{ width: "50%", margin: "auto" }}>
              <div id="productPrice">
                <p>
                  {new Intl.NumberFormat("fr-BE", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>
              </div>
            </div>
            <div id="ProductInfoBottom" style={{ margin: "auto" }}>
              <div className="productVendor">
                <p>
                  <img
                    src={product.vendor_avatar}
                    className="user-img-card"
                    alt={product.author}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "inline-block",
                      marginBottom: "0",
                    }}
                  ></img>{" "}
                  <b>{product.vendor}</b>
                </p>
              </div>
              <div className="productDate">
                <p>
                  <b>
                    Since &nbsp;
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(Date.parse(product.createdAt))}
                  </b>
                </p>
              </div>

              {product.status === false && (
                <div className="productStatus">
                  <p>
                    <b>Waiting </b>
                    <i className="fas fa-circle" id="ProductStatusFalse"></i>
                  </p>
                </div>
              )}

              {product.status === true && (
                <div className="productStatus">
                  <p>
                    <b>On Sale </b>
                    <i className="fas fa-circle" id="ProductStatusTrue"></i>
                  </p>
                </div>
              )}
              <div className="productStock">
                <p style={{ color: "rgb(204, 7, 7)" }}>
                  <b>
                    {product.quantity}{" "}
                    <span style={{ color: "black" }}>pcs left</span>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="productBody">
          <div id="slider">
            <figure>
              {productimgs.slice(0, 5).map((productimg) => (
                <img
                  src={productimg.path}
                  key={productimg.id}
                  className="productImage"
                  alt=""
                  style={{ width: "300px", height: "300px" }}
                />
              ))}
            </figure>
          </div>

          <div
            className="productDescription"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDescription;
