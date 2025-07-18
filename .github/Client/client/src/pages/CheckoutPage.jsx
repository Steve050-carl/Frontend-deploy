import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function CheckoutPage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/mpesa/pay", {
        phone,
        amount
      });
      setMessage("STK Push sent to your phone.");
    } catch (err) {
      console.error(err);
      setMessage("Error sending STK Push.");
    }
  };

  return (
    <Container className="my-5">
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit} className="my-4">
        <Form.Group className="mb-3">
          <Form.Label>Phone Number (07...)</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Total Amount (Ksh)</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Pay with M-Pesa</Button>
      </Form>
      {message && <Alert variant="info">{message}</Alert>}
    </Container>
  );
}

export default CheckoutPage;
