import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AppNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">CampusMart</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}

            {user && user.isAdmin && (
              <NavDropdown title="Admin" id="admin-dropdown">
                <NavDropdown.Item as={Link} to="/admin">Transactions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/products">Manage Products</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/analytics">Analytics</NavDropdown.Item>
              </NavDropdown>
            )}

            {user && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
