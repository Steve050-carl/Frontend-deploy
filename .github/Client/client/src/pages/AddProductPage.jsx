import { useState } from "react";
import UploadImage from "../components/UploadImage";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function AddProductPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadComplete = (url) => {
    setProduct({ ...product, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/products', product);
    alert("Product added");
  };

  return (
    <Container className="my-5">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Control name="name" placeholder="Product name" onChange={handleChange} className="mb-2" />
        <Form.Control name="description" placeholder="Description" onChange={handleChange} className="mb-2" />
        <Form.Control name="price" type="number" placeholder="Price" onChange={handleChange} className="mb-2" />
        <UploadImage onUpload={handleUploadComplete} />
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProductPage;
