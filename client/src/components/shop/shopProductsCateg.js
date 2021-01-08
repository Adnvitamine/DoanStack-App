import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductRatings from "./productRatings/productRatings";

//import ProductId from "./articeId";

const ShopProductsCateg = ({ category }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [sortButton, setSortButton] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/shop/${category}`
        );
        const jsonData = await response.json();
        setAllProducts(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllProducts();
  }, [category]);

  const FilterByLow = () =>{
    setSortButton(false);
    //setMessage("Sort By New");
  }
  const FilterByHigh = () =>{
    setSortButton(true);
    //setMessage("Sort By Old");
  }

  return (
    <Fragment>
      <div className="dataFilter" style={{ width: "100%", minHeight: "50px", display: "flex", flexFlow: "row wrap", justifyContent: "space-around"}} >
        <b>Sort products by: </b>
        <div>
          {sortButton === true && (<button type="button" className="btn btn-primary" style={{padding: "3px 6px"}} onClick={FilterByLow}>
            Price <i className="fas fa-arrow-up"></i>
          </button>)} 
          {sortButton !== true && ((<button type="button" className="btn btn-secondary" style={{padding: "3px 6px"}} onClick={FilterByHigh}>
            Price <i className="fas fa-arrow-down"></i>
          </button>
          ))}
          {/*message*/}
        </div>
      </div>
      {(sortButton !== true && (<div>
        {allProducts.sort(({price: LowPrice}, {price: highPrice}) => LowPrice - highPrice ).map((product) => (
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
      </div>))
      ||
      (
        <div>
          {allProducts.sort(({price: lowPrice}, {price: highPrice})=> highPrice - lowPrice).map((product) => (
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
        </div>
      )}
    </Fragment>
  );
};

export default ShopProductsCateg;
