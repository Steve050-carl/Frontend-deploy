import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (!res.data.user.isAdmin) {
        setError("Access denied: not an admin");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: 500 }}>
      <h2>Admin Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;
