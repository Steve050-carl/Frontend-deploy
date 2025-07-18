import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/transactions")
      .then(res => setTransactions(res.data));
  }, []);

  return (
    <Container fluid className="my-5">
      <h2>Admin Dashboard: Transactions</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Phone</th>
            <th>Amount (Ksh)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx._id}>
              <td>{index + 1}</td>
              <td>{tx.phone}</td>
              <td>{tx.amount}</td>
              <td>{tx.status}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
