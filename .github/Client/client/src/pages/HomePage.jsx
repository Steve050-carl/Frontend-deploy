import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-4">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading products...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row className="g-3">
          {products.map((item) => (
            <Col md={4} key={item._id}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomePage;
