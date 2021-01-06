import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductRatings from "./productRatings/productRatings";
//import ArticleId from "./articeId";

const ShopAllProducts = ({ currentUser }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/shop/status/true`
        );
        const jsonData = await response.json();
        setAllProducts(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllProducts();
  }, []);

  return (
    <Fragment>
      {allProducts.map((product) => (
        <Link
          to={`/shop/${product.category}/${product.id}/${product.name}`}
          id="ShopLink"
          key={product.id}
        >
          <div className="shopFrame">
            <div className="shopImg">
              <img src={product.image} alt={product.name}></img>
            </div>
            <div className="shopBody">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className="shopInfo">
              <div className="shopProductName">
                <p>{product.name}</p>
              </div>
              <div className="ratings">
                <ProductRatings productId={product.id} />
              </div>
              <div className="shopProductPrice">
                <p>€{product.price}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default ShopAllProducts;
