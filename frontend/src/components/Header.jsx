import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {

  const {cartItems} = useSelector(state=>state.cart)

  return (
    <header>
      <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={"ms-auto"}>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg={'success'} style={{marginLeft: '5px'}} >
                    {cartItems.reduce((acc, c)=> acc + c.qty, 0)}
                    </Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
