import { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ReviewModal from "./ReviewModal";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [showReview, setShowReview] = useState(false);

  const handleAddToCart = () => {
    if (!user) return alert("Please login first");
    axios.post("http://localhost:5000/api/products/cart", {
      productId: product._id
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("Added to cart"));
  };

  const handleFavorite = () => {
    if (!user) return alert("Please login first");
    axios.post("http://localhost:5000/api/products/favorites", {
      productId: product._id
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => alert("Added to favorites"));
  };

  return (
    <>
      <Card className="h-100">
        <Card.Img variant="top" src={product.image} style={{ height: "200px", objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Ksh {product.price.toLocaleString()}</Card.Text>
          <Card.Text>
            <small className="text-muted">⭐ {product.rating.toFixed(1)} ({product.numReviews})</small>
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button size="sm" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="sm" variant="outline-danger" onClick={handleFavorite}>♥</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => setShowReview(true)}>☆</Button>
          </div>
        </Card.Body>
      </Card>

      <ReviewModal
        productId={product._id}
        show={showReview}
        handleClose={() => setShowReview(false)}
        onSubmit={() => window.location.reload()}
      />
    </>
  );
};

export default ProductCard;
