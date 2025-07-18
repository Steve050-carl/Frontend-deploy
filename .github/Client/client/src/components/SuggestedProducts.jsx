import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const SuggestedProducts = ({ category }) => {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => setSuggested(res.data.slice(0, 4))); // Top 4
  }, [category]);

  return (
    <div className="my-5">
      <h4>🔮 Suggested for You</h4>
      <Row>
        {suggested.map((product) => (
          <Col key={product._id} md={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SuggestedProducts;
