import { Fragment, useEffect, useState } from "react";

const UserActivity = ({ user_id }) => {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/vendor_id/${user_id}`
        );
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProducts();
  }, [user_id]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/articles/author_id/${user_id}`
        );
        const jsonData = await response.json();
        setArticles(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getArticles();
  }, [user_id]);

  return (
    <Fragment>
      <div className="userCardInfo">
        {!products.length && (
          <p>
            <strong>Product Activity: </strong>No product
          </p>
        )}
        {products.length === 1 && (
          <p>
            <strong>Product Activity: </strong>
            {products.length} product
          </p>
        )}
        {products.length > 1 && (
          <p>
            <strong>Product Activity: </strong>
            {products.length} products
          </p>
        )}
      </div>
      <div className="userCardInfo">
        {!articles.length && (
          <p>
            <strong>Articles Activity: </strong>No article
          </p>
        )}
        {articles.length === 1 && (
          <p>
            <strong>Articles Activity: </strong>
            {articles.length} article
          </p>
        )}
        {articles.length > 1 && (
          <p>
            <strong>Articles Activity: </strong>
            {articles.length} articles
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default UserActivity;
