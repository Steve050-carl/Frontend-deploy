import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const UploadImage = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);

    onUpload(res.data.secure_url);
    setLoading(false);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Upload Product Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleUpload} />
      </Form.Group>
      {loading && <Spinner animation="border" />}
    </>
  );
};

export default UploadImage;
