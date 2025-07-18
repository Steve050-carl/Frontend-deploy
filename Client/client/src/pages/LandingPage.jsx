import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{
      background: 'url("/assets/market-bg.jpg") center/cover no-repeat',
      height: "100vh",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Container fluid className="text-center bg-dark bg-opacity-50 p-5 rounded">
        <h1 className="display-3">Welcome to CampusMart</h1>
        <p className="lead">Affordable, verified second-hand goods for students in Kenya</p>
        <Button size="lg" onClick={() => navigate("/products")}>Browse Products</Button>
      </Container>
    </div>
  );
};

export default LandingPage;
