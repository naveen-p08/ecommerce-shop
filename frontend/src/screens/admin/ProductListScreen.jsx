import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productApiSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductListScreen() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  async function deleteHandler(id) {
    console.log("delete", id);
  }

  async function createProductHandler() {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (e) {
        toast.error(e.data.message || e.error);
      }
    }
  }

  return (
    <>
      <Row className={"align-items-center"}>
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className={"text-end"}>
          <Button className={"btn-sm m-3"} onClick={createProductHandler}>
            <FaEdit />
            Create Product
          </Button>
        </Col>
      </Row>
      
      {loadingCreate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Table striped responsive hover className={"table-sm"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`admin/product/${product._id}`}>
                        <Button className={"btn-sm mx-2"}>
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        variant={"danger"}
                        className={"btn-sm"}
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default ProductListScreen;
