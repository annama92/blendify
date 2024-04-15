import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Buttons.css";
import "../styles/ButtonsSection.css";
import Opera from "../resources/opera.jpg";

export default function ButtonsSection() {
  return (
    <Container>
      <Row className="ButtonsSection">
        <Col class="col-md-1"></Col>
        <Col class="col-md-2" className="Image">
          <img src={Opera} class="opera float-left" alt="OPERA" />
        </Col>
        <Col class="col-md-8" className="HeaderButtons">
          <Row>
            <Col align="center">
              <h1 className="text">John's Danceability Playlist</h1>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <button className="Add">ADD PLAYLIST</button>
              <button className="New">NEW PLAYLIST</button>
              <button className="Diff">DIFFERENT ATTRIBUTE</button>
            </Col>
          </Row>
        </Col>
        <Col class="col-md-1"></Col>
      </Row>
    </Container >
  );
}
