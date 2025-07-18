import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const productIds = res.data.favorites;
    const allProducts = await axios.get("http://localhost:5000/api/products");
    const filtered = allProducts.data.filter(p => productIds.includes(p._id));
    setFavorites(filtered);
  };

  const removeFavorite = async (productId) => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/products/favorites", {
      productId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <Container className="my-5">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite items yet.</p>
      ) : (
        <Row>
          {favorites.map(item => (
            <Col md={6} lg={4} key={item._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Ksh {item.price.toLocaleString()}</Card.Text>
                  <Button variant="danger" size="sm" onClick={() => removeFavorite(item._id)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPage;
