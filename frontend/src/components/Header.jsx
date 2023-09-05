import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
// import {LinkContainer} from 'react-router-bootstrap'
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler(e) {
    try {
      await logoutApiCall().unwrap;
      dispatch(logout());
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <header>
      <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={"ms-auto"}>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg={"success"} style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, c) => acc + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id={"username"}>
                  <NavDropdown.Item as={Link} to={"/profile"}>
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id={"adminmenu"}>
                  <NavDropdown.Item as={Link} to={"/admin/productlist"}>
                    Products
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to={"/admin/userlist"}>
                    Users
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to={"/admin/orderlist"}>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
