import React, { Fragment, useEffect, useState } from "react";

const UserBoard = ({ currentUser }) => {
  //const id =
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/user_id/${currentUser.id}`
        );
        const jsonData = await response.json();

        setUsers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUsers();
  }, [currentUser.id]);

  //Get User Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/vendor_id/${currentUser.id}`
        );
        const jsonData = await response.json();

        setProducts(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProducts();
  }, [currentUser.id]);

  //Get User Products
  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/articles/author_id/${currentUser.id}`
        );
        const jsonData = await response.json();

        setArticles(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getArticles();
  }, [currentUser.id]);

  return (
    <Fragment>
      <div id="userProfile">
        <div className="ComponentTitle">
          <div>
            <h1>Profile</h1>
          </div>
        </div>
        {users.map((user) => (
          <div id="profileCard" key={user.id}>
            {!user.avatar && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="no-avatar"
                className="user-img-card"
                style={{ marginTop: "20px" }}
              ></img>
            )}
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.username}
                className="user-img-card"
                style={{ marginTop: "20px" }}
              ></img>
            )}
            <h1>{user.username}</h1>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>

            {!products.length && (
              <p>
                <strong>Products: </strong> no product
              </p>
            )}
            {products.length === 1 && (
              <p>
                <strong>Products :</strong> {products.length} product
              </p>
            )}
            {products.length > 1 && (
              <p>
                <strong>Products: </strong> {products.length} products
              </p>
            )}

            {!articles.length && (
              <p>
                <strong>Articles: </strong> No article
              </p>
            )}
            {articles.length === 1 && (
              <p>
                <strong>Articles :</strong> {articles.length} article
              </p>
            )}
            {articles.length > 1 && (
              <p>
                <strong>Articles: </strong> {articles.length} articles
              </p>
            )}
            {/*<p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>*/}
            <p>
              <strong>Roles: </strong>
              {user.roles.map((role) => (
                <span
                  style={{ display: "inline-block" }}
                  key={role.user_roles.roleId}
                >
                  {role.name === "admin" && (
                    <li
                      className="btn btn-danger"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      {role.name}
                    </li>
                  )}
                  {role.name === "moderator" && (
                    <li
                      className="btn btn-warning"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      {role.name}
                    </li>
                  )}
                  {role.name === "user" && (
                    <li
                      className="btn btn-success"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      {role.name}
                    </li>
                  )}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default UserBoard;
