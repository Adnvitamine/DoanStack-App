import { Fragment, useEffect, useState } from "react";
import ViewProduct from "./viewProduct";
import EditProduct from "./editProduct";
import QuillEdit from "./quillEdit";
//import TruncateDescription from './truncateDescription';

const ListProducts = ({ currentUser }) => {
  const [products, setProducts] = useState([]);

  // DELETE PRODUCT FUNCTION

  const deleteProduct = async (id) => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:8080/api/products/${id}`,
        {
          method: "DELETE",
        }
      );
      //window.location="/";

      setProducts(products.filter((product) => product.id !== id));
      console.log(deleteProduct);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  return (
    <Fragment>
      <div className="container text-center" id="productsList">
        <div className="ComponentTitle">
          <div>
            <h1>
              All {currentUser.username}'s products ({products.length})
            </h1>
          </div>
        </div>

        {!products.length && (
          <div className="ComponentEmpty">
            <div>Empty</div>
          </div>
        )}

        {products.map((product) => (
          <div className="productCard" key={product.id}>
            <div className="productCardName">
              <p>
                {product.status === false && (
                  <i className="fas fa-circle" id="miniStatusFalse"></i>
                )}
                {product.status === true && (
                  <i className="fas fa-circle" id="miniStatusTrue"></i>
                )}
                {product.name}
              </p>
            </div>
            <div className="productCardImage">
              <img
                id="productCardImage"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="productCardDescription">
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            <div className="productCardPrice">
              Price:{" "}
              <b>
                {new Intl.NumberFormat("fr-BE", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.price)}
              </b>{" "}
              | Date:{" "}
              <b>
                {new Intl.DateTimeFormat("nl-BE", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                }).format(Date.parse(product.createdAt))}
              </b>
            </div>
            <div className="productCardAction">
              <ViewProduct product={product} />
              <EditProduct product={product} />
              <QuillEdit product={product} />
              <button
                className="miniDeleteButton"
                onClick={() => deleteProduct(product.id)}
              >
                <i className="far fa-trash-alt"></i>
                <p>Delete</p>
              </button>
            </div>
          </div>

          /*<tr key={product.id}>
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

export default ListProducts;
