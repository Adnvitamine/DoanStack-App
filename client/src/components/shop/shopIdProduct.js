import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShopViewImage from "./shopViewImage";
import ShopViewImages from "./shopViewImages";
import ProductRatings from "./productRatings/productRatings";
import ProductCreateRating from "./productRatings/productCreateRating";
import ProductCreateReview from "./productComs/productCreateReview";
import ProductReadReviews from "./productComs/productReadReviews";

const ShopIdProduct = ({ productId, currentUser }) => {
  //const id =
  const [user] = useState(currentUser);
  const [product, setProduct] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [productimgs, setProductimgs] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );
        const jsonData = await response.json();
        setProduct(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/shop/${product.category}`
        );
        const jsonData = await response.json();
        setListProducts(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getListProducts();
  }, [product.category]);

  useEffect(() => {
    const getProductimgs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productimgs/product_id/${productId}`
        );
        const jsonData = await response.json();

        setProductimgs(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProductimgs();
    //console.log(productimgs);
  }, [productId]);

  //const productPath = `/${product.category}/${product.id}/${product.name}`;

  //console.log(productPath);
  //let test = new Date();
  //let dateformat = Date.parse(test.toString(product.createdAt));

  return (
    <Fragment>
      <div className="BrowserNavbar">
        {user === "Visitor" && (
          <p>
            "By{" "}
            {product.vendor_avatar === "null" && (
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
            {product.vendor_avatar !== "null" && (
              <img
                src={product.vendor_avatar}
                className="profile-img-card"
                alt={product.vendor}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {product.vendor}. Sign in to comment" - DoanStack.be
          </p>
        )}
        {user.username && (
          <p>
            "By{" "}
            {product.vendor_avatar === "null" && (
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
            {product.vendor_avatar !== "null" && (
              <img
                src={product.vendor_avatar}
                className="profile-img-card"
                alt={product.vendor}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {product.vendor}. Logged as {user.avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="guest"
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
            {user.avatar !== "null" && (
              <img
                src={user.avatar}
                alt={user.username}
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}>
                </img>
            )}{user.username}."
          </p>
        )}
      </div>
      <div id="TitleLink">
        <h1>{product.name}</h1>
      </div>
      <div id="ShopBody">
        <div id="ShopNav">
          <ul>
            <li>
              <Link to="/">
                <b>All</b>
              </Link>
            </li>
            <li>
              {(product.category === "Cosmetic" && (
                <Link to="/Cosmetic" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>Cosmetic</b>
                </Link>
              )) || (
                <Link to="/Cosmetic">
                  <b>Cosmetic</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Fashion" && (
                <Link to="/Fashion" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>Fashion</b>
                </Link>
              )) || (
                <Link to="/Fashion">
                  <b>Fashion</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "PC" && (
                <Link to="/PC" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>PC</b>
                </Link>
              )) || (
                <Link to="/PC">
                  <b>PC</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Estate" && (
                <Link to="/Estate" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>Estate</b>
                </Link>
              )) || (
                <Link to="/Estate">
                  <b>Estate</b>
                </Link>
              )}
            </li>
            <li>
              {(product.category === "Services" && (
                <Link to="/Services" style={{ color: "rgb(0, 162, 255)" }}>
                  <b>Services</b>
                </Link>
              )) || (
                <Link to="/Services">
                  <b>Services</b>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div id="ShopHome">
          <div className="backbutton" style={{ marginBottom: "10px" }}>
            <Link
              to={`/${product.category}`}
              className="btn btn-warning"
              style={{ color: "white", textDecoration: "none" }}
            >
              Back
            </Link>
          </div>
          <div id="MoreProducts">
            <div className="header">
              <span className="empty"> </span>
              <p>
                <b>Suggest products</b>
              </p>
            </div>
            <div className="body">
              {listProducts.map((listproduct) => (
                <Link
                  to={`/${listproduct.category}/${listproduct.id}/${listproduct.name}`}
                  key={listproduct.id}
                >
                  <div className="list">
                    {listproduct.name !== product.name && (
                      <div className="productImg">
                        <span>
                          <img
                            src={listproduct.image}
                            alt={listproduct.name}
                          ></img>
                        </span>
                      </div>
                    )}

                    <div className="productTitle">
                      {listproduct.name !== product.name && (
                        <b>{listproduct.name}</b>
                      )}
                      {listproduct.name !== product.name && (
                        <ProductRatings productId={listproduct.id} />
                      )}
                      {listproduct.name !== product.name && (
                        <p style={{ textAlign: "center", color: "#b12704" }}>
                          € {listproduct.price}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div id="ShopHomeProduct">
            <div className="productSoloHeader">
              <div id="ImageFrame">
                <ShopViewImage product={product} productImage={product.image} />
                <img
                  src={product.image}
                  style={{ height: "500px" }}
                  alt={product.name}
                ></img>
              </div>
              {productimgs.length !== 0 && (
                <div id="slider">
                  <figure>
                    {productimgs.slice(0, 5).map((productimg) => (
                      <div
                        className="imageSlider"
                        key={productimg.id}
                        style={{ width: "300px", height: "300px" }}
                      >
                        {" "}
                        <div className="imageGrid">
                          <ShopViewImages
                            product={product}
                            productImage={productimg.path}
                            productImageId={productimg.id}
                          />
                          <img
                            src={productimg.path}
                            className="productImage"
                            alt={product.title}
                          />
                        </div>
                      </div>
                    ))}
                  </figure>
                </div>
              )}
              <div className="productSoloInfo">
                <div className="productSoloName">
                  <p>{product.name}</p>
                </div>
                <div className="productSoloRating">
                  <ProductRatings productId={productId} />
                </div>
                <div className="productSoloPrice">
                  <p>€{product.price}</p>
                </div>
                {product.quantity !== 0 && (
                  <div className="productSoloQuantity">
                    {(product.quantity === 1 && (
                      <p style={{ color: "black" }}>
                        <span className="warning" style={{ color: "#b12704" }}>
                          <b>Last piece !!!</b>
                        </span>
                      </p>
                    )) || (
                      <p style={{ color: "black" }}>
                        <span
                          className="noWarning"
                          style={{ color: "##018b08" }}
                        >
                          {product.quantity} pcs left
                        </span>
                      </p>
                    )}
                  </div>
                )}
                <div className="productSoloAdd">
                  <button type="button" className="btn btn-warning">
                    <i className="fas fa-cart-plus"></i>
                    <p>Add to cart</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="productSoloContent">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className="rateThisProduct">
              <div className="ComponentTitle">
                <div>
                  <h1>Rate this product</h1>
                </div>
              </div>
              {user === "Visitor" && (
                <p>Please <a href="/login">sign in</a> to evaluate this product</p>
              )}
              {user.username && (
                <ProductCreateRating productId={productId} userId={user.id} />
              )}
            </div>
            <div className="reviewProduct">
              <div className="ComponentTitle">
                <div>
                  <h1>Write a review</h1>
                </div>
              </div>
              {user === "Visitor" && <p>Please <a href="/login">sign in</a> to write a review</p>}
              {user.username && (
                <ProductCreateReview productId={productId} user={user} />
              )}
            </div>
            <div className="readReviews">
              <ProductReadReviews
                productId={productId}
                productName={product.name}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopIdProduct;
