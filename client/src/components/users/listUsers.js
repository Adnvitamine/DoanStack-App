import React, { Fragment, useEffect, useState } from "react";
import UserActivity from "./userActivity";
//import ViewProduct from "./viewProduct";
//import EditUser from "./editUser";
//import Truncate from 'react-truncate-html';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  // DELETE PRODUCT FUNCTION

  const deleteUser = async (id) => {
    try {
      const deleteUser = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      //window.location="/";

      setUsers(users.filter((user) => user.id !== id));
      console.log(deleteUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users`);
        const jsonData = await response.json();

        setUsers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUsers();
  }, []);

  return (
    <Fragment>
      <div className="container text-center" id="usersList">
        <div className="ComponentTitle">
          <div>
            <h1>Users ({users.length})</h1>
          </div>
        </div>

        {users.map((user) => (
          <div className="userCard" key={user.id}>
            <div className="userCardName">
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
            </div>

            <div className="userCardInfo">
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
            </div>
            <UserActivity user_id={user.id} />
            <div className="userCardInfo" >
              <strong>Roles:</strong> &nbsp;
              {user.roles.map((role) => (
                <div
                  style={{ display: "inline-block" }}
                  key={role.user_roles.roleId}
                >
                  {role.name === "admin" && (
                    <li
                      className="btn btn-danger"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      Admin
                    </li>
                  )}
                  {role.name === "moderator" && (
                    <li
                      className="btn btn-warning"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      Moderator
                    </li>
                  )}
                  {role.name === "user" && (
                    <li
                      className="btn btn-success"
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      User
                    </li>
                  )}
                </div>
              ))}
            </div>

            <div className="userCardAction">
              <button id="miniDeleteButton" onClick={() => deleteUser(user.id)}>
                <i className="far fa-trash-alt"></i>
                <p>Delete</p>
              </button>
            </div>
          </div>

          /*
                        <img id="productCardImage" src={user.image} alt={user.username} /> 
                        <ViewUser user={user} />
                        <EditUser user={user} />
                        
                        <li className="btn btn-danger" key={role.user_roles.roleId} style={{marginRight: '3px'}} >{role.name}</li>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.image}</td>
                            <td>{product.category}</td>
                            <td>{product.price}$</td>
                            <td>{product.vendor}</td>
                            {product.status === false &&
                            <td>Waiting</td>
                            }
                            {product.status === true &&
                            <td>On Sale</td>
                            }
                            <td><ViewProduct product={product} /></td>                      
                            <td><EditProduct product={product} /></td>
                            <td><button id="miniDeleteButton" onClick={()=> deleteProduct(product.id)} ><i className="las la-trash-alt"><p>Delete</p></i></button></td>
                         
                        </tr>
                        
                        */
        ))}
      </div>
    </Fragment>
  );
};

export default ListUsers;
