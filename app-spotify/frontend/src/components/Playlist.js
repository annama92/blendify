import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import "../styles/SongRow.css";
import Marv from "../resources/marv.jpg";

export default function Playlist() {
  return (
    <Container className="playlist">
      <Row>
        <Col class="col-1" className="album">
          <img src={Marv} class="marv float-left" alt="" />
        </Col>
        <Col class="col-9" className="name">
          <p className="para">Tame Impala - Borderline</p>
        </Col>
        <Col class="col-2" className="controls"></Col>
      </Row>
    </Container>
  );
}
