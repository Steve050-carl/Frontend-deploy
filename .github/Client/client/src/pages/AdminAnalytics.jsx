import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";

function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="text-center mt-5">Loading analytics...</p>;

  return (
    <Container className="my-5">
      <h2>📊 Admin Analytics Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Total Products</h4>
            <p>{data.totalProducts}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Total Transactions</h4>
            <p>{data.totalTransactions}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Total Revenue (Ksh)</h4>
            <p>{data.totalRevenue.toLocaleString()}</p>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Header>Product Categories Breakdown</Card.Header>
        <ListGroup>
          {data.categoryBreakdown.map((c) => (
            <ListGroup.Item key={c._id}>
              {c._id} — {c.count} items
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default AdminAnalytics;
