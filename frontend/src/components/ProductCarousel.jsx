import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message.jsx";
import { useGetTopProductsQuery } from "../slices/productApiSlice.js";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return !isLoading && ( error ? (
    <Message variant={'danger'}>{error.message}</Message>
  ) : (
    <Carousel pause={"hover"} className={"bg-primary mb-4"}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} />
            <Carousel.Caption>
              <h3>
                {product.name} [${product.price}]
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ))
}

export default ProductCarousel;