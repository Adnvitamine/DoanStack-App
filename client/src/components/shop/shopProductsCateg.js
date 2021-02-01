import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductRatings from "./productRatings/productRatings";

//import ProductId from "./articeId";

const ShopProductsCateg = ({ category }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [sortButton, setSortButton] = useState(true);
  const postLimit = 10;
  const totalPages = Math.ceil(allProducts.length/postLimit);
  const pagesArray = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPost, setLastPost] = useState(10);
  const [firstPost, setFirstPost] = useState(0);

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

  useEffect(()=>{
    setLastPost(currentPage*postLimit);
    setFirstPost(lastPost-postLimit);
  }, [currentPage, lastPost])

  for( let i = 1 ; i <= totalPages; i++){
    pagesArray.push(i)
  }

  const pageChange = async (page) =>{
    try { 
      setCurrentPage(page);
    } catch(err){
      console.error(err.message);
    }
  }

  const FilterByLow = () =>{
    setSortButton(false);
    //setMessage("Sort By New");
  }
  const FilterByHigh = () =>{
    setSortButton(true);
    //setMessage("Sort By Old");
  }

  let showPage;
  if(currentPage){
      if(sortButton === true){
        showPage = <div>{allProducts.sort(({price: lowPrice}, {price: highPrice})=> highPrice - lowPrice).slice(firstPost, lastPost).map((product) => (
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
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: product.description }} />
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
        ))}</div>;
      }else{
        showPage = <div>{allProducts.sort(({price: LowPrice}, {price: highPrice}) => LowPrice - highPrice ).slice(firstPost, lastPost).map((product) => (
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
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: product.description }} />
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
        ))}</div>;
      }
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
      {showPage}
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "10px", marginTop: "10px"}}>
      {pagesArray.map((page)=>(<div key={page}>
        {(currentPage===page && (<button className="btn btn-success" onClick={() => pageChange(page)} style={{padding: "2px 5px", marginRight: "5px"}}>
        {page}
      </button>))||(<button className="btn btn-primary" onClick={() => pageChange(page)} style={{padding: "2px 5px", marginRight: "5px"}}>
        {page}
      </button>)}
      
      </div>
      ))}
      </div>
    </Fragment>
  );
};

export default ShopProductsCateg;
