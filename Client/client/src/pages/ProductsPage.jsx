import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Electronics", "Books", "Clothing", "Home", "Other"];

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:5000/api/products?category=${category}`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    
    <Container className="my-5">
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {products.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default ProductsPage;
