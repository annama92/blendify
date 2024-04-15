import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import WFN from "../resources/wfn.png";
import "../styles/Menu.css";

export default function ButtonsSection() {
  return (
    <Container>
      <Row>
        <Col>
          <img src={WFN} class="wfn float-left" alt="WFN" />
        </Col>
      </Row>
    </Container>
  );
}
