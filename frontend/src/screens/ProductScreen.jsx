import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../slices/cartSlice.js";
import {toast} from "react-toastify";
import Meta from '../components/Meta.jsx'



function ProductScreen() {
  const {id: productId} = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    refetch,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);
  
  const [createReview, {isLoading: loadingProductReview}] =
    useCreateReviewMutation();
  
  const {userInfo} = useSelector((state) => state.auth);
  
  function addToCartHandler() {
    dispatch(addToCart({...product, qty}));
    navigate("/cart");
  }
  
  async function submitHandler(e) {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap()
      refetch();
      toast.success("Your review has been added");
      setRating(0);
      setComment("");
    }catch (e) {
      toast.error(e?.data?.message || e.error)
    }
  }
  
  return (
    <>
      <Link to={"/"} className={"btn btn-light my-3"}>
        Go Back
      </Link>
      
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant={"danger"}>{isError?.error?.message}</Message>
      ) : (
        <>
          <Meta title={product.name} />
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
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  
                  <ListGroup.Item>
                    <Button
                      className={"btn-block"}
                      type={"button"}
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          
          <Row className={"review"}>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No Reviews Yet</Message>
              )}
              
              <ListGroup variant={"flush"}>
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      
                      <Rating value={review.rating}/>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
                
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {loadingProductReview && <Loader/>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId={"rating"} className={"my-2"}>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value={""}>Select</option>
                          <option value={"1"}>1</option>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                          <option value={"4"}>4</option>
                          <option value={"5"}>5</option>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group controlId={"comment"} className={"my-2"}>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                        <Button
                          disabled={loadingProductReview}
                          type={"submit"}
                          variant={"primary"}
                        >
                          Submit Review
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message variant={"danger"}>
                      Please <Link to={"/login"}>Login</Link> to Write a Review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
