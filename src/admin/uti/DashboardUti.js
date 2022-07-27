import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

import Users from './Users';

import { URL_ADMIN } from '../Const';

export default class DashboardUti extends Component {
  state = {
    authUti: false,
    users: [],
    msm: false,
    msmStatus: false,
    show: false,
    u: null,
    p: null,
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  users = () => {
    const reqUsers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        k: this.props.k,
      }),
    };

    fetch(URL_ADMIN + 'users.class.php', reqUsers)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true, users: data.users });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  newUser = () => {
    const reqNewUser = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        k: this.props.k,
      }),
    };

    fetch(URL_ADMIN + 'newUser.class.php', reqNewUser)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true, u: data.u, p: data.p });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
    this.setState({ show: true });
  };
  render() {
    return (
      <div className="navBarContainer vh-100 vw-100">
        <Navbar expand="sm" bg="primary" variant="dark" className="px-2">
          <Navbar.Brand className="m-auto text-center">
            <div>Administrador UTI</div>
            <div>{this.props.u}</div>
          </Navbar.Brand>
        </Navbar>
        <Card className="text-center w-100">
          <Card.Header className="d-flex justify-content-evenly">
            <Button variant="primary" onClick={this.users}>
              Ver / Actualizar
            </Button>
            <Button variant="outline-success" onClick={this.newUser}>
              Crear Usuario
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Body>
              <Card.Title
                className="p-2 text-white"
                style={{ background: '#0d6efd' }}
              >
                USUARIOS
              </Card.Title>
              <table responsive="sm" className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Condición</th>
                    <th>Creado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((e, index) => (
                    <Users key={index} datos={e} />
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card.Body>
        </Card>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Usuario Generado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel label="Usuario" className="mb-3 w-100">
              <Form.Control
                type="text"
                placeholder="Usuario"
                defaultValue={this.state.u}
              />
            </FloatingLabel>
            <FloatingLabel label="Contraseña" className="mb-3 w-100">
              <Form.Control
                type="text"
                placeholder="Contraseña"
                defaultValue={this.state.p}
              />
            </FloatingLabel>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
