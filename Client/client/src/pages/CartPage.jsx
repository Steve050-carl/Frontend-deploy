import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const itemIds = res.data.cart;
    const productsRes = await axios.get("http://localhost:5000/api/products");
    const filtered = productsRes.data.filter(p => itemIds.includes(p._id));
    setCartItems(filtered);
  };

  const removeItem = async (productId) => {
    await axios.post("http://localhost:5000/api/products/cart/remove", {
      productId,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container className="my-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Row>
            {cartItems.map(item => (
              <Col md={6} lg={4} key={item._id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Ksh {item.price.toLocaleString()}</Card.Text>
                    <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Card className="p-4 shadow-sm mt-4">
            <h4>Subtotal: <strong>Ksh {subtotal.toLocaleString()}</strong></h4>
            <Button onClick={() => navigate("/checkout")} className="mt-2" size="lg">Proceed to Checkout</Button>
          </Card>
        </>
      )}
    </Container>
  );
}

export default CartPage;
