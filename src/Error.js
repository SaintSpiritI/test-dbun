import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

export default class Error extends Component {
  render() {
    return (
      <div>
        <Card className="text-center">
          <Card.Header>Pagina No Encontrada</Card.Header>
          <Card.Body>
            <Card.Subtitle className="my-3">
              La Pagina que busca no se encontro
            </Card.Subtitle>
            <Card.Text className="my-3">Regresar a:</Card.Text>
            <Nav.Link
              href="home"
              className="btn btn-outline-success w-25 m-auto"
            >
              HOME
            </Nav.Link>
          </Card.Body>
          <Card.Footer className="text-muted">UNJBG | DBUN</Card.Footer>
        </Card>
      </div>
    );
  }
}
