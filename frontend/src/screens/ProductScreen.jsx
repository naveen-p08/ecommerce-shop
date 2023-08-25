import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import axios from "axios";
import {useState,useEffect} from "react";

function ProductScreen() {
  const [product, setProduct] = useState({})
  const [imgIndex, setImgIndex] = useState(0)
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link to={"/"} className={"btn btn-light my-3"}>
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image
            className={"main-product-image"}
            src={product?.image}
            alt={product.name}
            fluid
          />

          {/*<div className={"mt-3 thumbnail-container"}>*/}
          {/*  {product && product?.image.map((image, index) => {*/}
          {/*    return <Image*/}
          {/*      key={index}*/}
          {/*      src={image}*/}
          {/*      alt={`image ${index + 1}`}*/}
          {/*      thumbnail*/}
          {/*      className={`thumbnail ${*/}
          {/*        product.image[imgIndex] === image ? "thumbnail-active" : ""*/}
          {/*      }`}*/}
          {/*      onClick={() => (setImgIndex(index))}*/}
          {/*    />;*/}
          {/*  })}*/}
          {/*</div>*/}
        </Col>
        <Col md={4}>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ListGroup.Item>
            {/*<ListGroup.Item>Price: ${product.price}</ListGroup.Item>*/}
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className={"btn-block"}
                  type={"button"}
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
