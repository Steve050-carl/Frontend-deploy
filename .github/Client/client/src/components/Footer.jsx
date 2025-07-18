import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} CampusMart. All rights reserved.
        </p>
        <small>
          Built with ❤️ for students | <a href="mailto:support@campusmart.co.ke" className="text-white">Contact Us</a>
        </small>
      </Container>
    </footer>
  );
}
