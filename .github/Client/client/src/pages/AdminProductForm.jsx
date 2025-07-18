import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import UploadImage from "../components/UploadImage";

function AdminProductForm() {
  const { id } = useParams(); // optional for edit
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (id) {
      await axios.put(`http://localhost:5000/api/admin/product/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post("http://localhost:5000/api/admin/product", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    navigate("/admin/products");
  };

  return (
    <Container className="my-5" style={{ maxWidth: 600 }}>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Control className="mb-2" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        <Form.Control className="mb-2" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <Form.Control className="mb-2" name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
        <UploadImage onUpload={(url) => setProduct({ ...product, image: url })} />
        {product.image && <img src={product.image} alt="" style={{ width: 100 }} />}
        <Button type="submit">{id ? "Update" : "Add"} Product</Button>
      </Form>
    </Container>
  );
  
}



export default AdminProductForm;
