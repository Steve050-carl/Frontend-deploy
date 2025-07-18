import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ReviewModal = ({ productId, show, handleClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/products/${productId}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      onSubmit(); // Refresh parent
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">★★★★★</option>
            <option value="4">★★★★</option>
            <option value="3">★★★</option>
            <option value="2">★★</option>
            <option value="1">★</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button onClick={submitReview}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
