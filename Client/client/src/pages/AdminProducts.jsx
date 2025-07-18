import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-5">
      <h2>Admin: Manage Products</h2>
      <Button className="mb-3" onClick={() => navigate("/admin/add-product")}>
        Add New Product
      </Button>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ksh</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <Button size="sm" onClick={() => navigate(`/admin/edit-product/${p._id}`)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => deleteProduct(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminProducts;
