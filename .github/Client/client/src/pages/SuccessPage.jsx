import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <h1 className="display-4 text-success">✔ Payment Successful!</h1>
      <p>Thank you for shopping with CampusMart. Your order has been received.</p>
      <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
    </Container>
  );
};

export default SuccessPage;
