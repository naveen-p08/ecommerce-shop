import { Row, Col } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import Meta from "../components/Meta.jsx";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? <ProductCarousel /> : (
        <Link to={"/"} className={"btn btn-light mb-4"}>
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>{isError?.error?.message}</Message>
      ) : (
        <>
          <Meta title={"Shop"} />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {/*   Pagination  */}
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
