import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <Container>
      <Row>
        <Col align="center">
          <p className="footer">
            Made with love at <a href="https://www.foundersnetwork.ca/">WFN</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
