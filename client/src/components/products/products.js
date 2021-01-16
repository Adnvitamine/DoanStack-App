import { Fragment } from "react";

import CreateProduct from "./createProduct";
import ListProducts from "./listProducts";

function Products({ currentUser }) {
  return (
    <Fragment>
      <ListProducts currentUser={currentUser} />
      <CreateProduct currentUser={currentUser} />
    </Fragment>
  );
}

export default Products;
