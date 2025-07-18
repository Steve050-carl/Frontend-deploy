import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

export default function ProductDetails() {
  const { id } = useParams(); // URL param
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!product) return <p className="text-center mt-4">Product not found</p>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success">Ksh {product.price}</h4>
          <p>{product.description}</p>
          <p>Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="success">Add to Cart</Button>
            <Button variant="outline-danger">Add to Favorites</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
