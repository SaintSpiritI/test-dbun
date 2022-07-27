import React, { Component } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import md5 from 'md5';

import { URL_ADMIN } from './admin/Const';

import Dashboard from './admin/DB';

class Admin extends Component {
  state = {
    auth: false,
    validData: false,
  };

  componentDidMount() {
    if (!this.state.auth) {
      const token = sessionStorage.getItem('token');
      if (token == '') {
      } else {
        const reqFontPage = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tk: token,
          }),
        };

        fetch(URL_ADMIN + 'session.class.php', reqFontPage)
          .then((response) => response.json())
          .then((data) => {
            if (data.msm == 'false') {
              this.setState({ auth: false });
            } else {
              this.setState({
                auth: true,
              });
              sessionStorage.setItem('token', data.token);
            }
          })
          .catch((error) => {
            this.setState({ error: true });
            console.log(' error :' + error + ' :');
          });
      }
    }
  }
  validData = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const user = md5(e.target['0'].value);
      const pwd = md5(e.target['1'].value);
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          u: user,
          p: pwd,
        }),
      };

      fetch(URL_ADMIN + 'login.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ auth: false });
          } else {
            this.setState({
              auth: true,
            });
            sessionStorage.setItem('token', data.token);
          }
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validData: true });
  };

  close = () => {
    this.setState({ auth: false });
    sessionStorage.setItem('token', '');
  };
  render() {
    if (this.state.auth) {
      return <Dashboard close={this.close} />;
    } else {
      return (
        <CardGroup
          className="vh-100"
          style={{
            backgroundColor: '#CCCCCC',
          }}
        >
          <Col sm={4} className="h-100 d-flex">
            <Form
              noValidate
              validated={this.state.validData}
              onSubmit={this.validData}
              style={{ backgroundColor: '#FFFFFFcA' }}
              className="w-75 mh-75 m-auto text-center"
            >
              <Card.Body className="p-4">
                <Card.Title className="mb-3 mt-4">Inicio de Sesion</Card.Title>
                <Card.Title className="mb-5">
                  Direccion de Bienestar Universitario
                </Card.Title>
                <Form.Group>
                  <InputGroup hasValidation>
                    <FloatingLabel label="Usuario" className="mb-3 w-100">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        minLength="2"
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <InputGroup hasValidation>
                    <FloatingLabel label="Password" className="mb-3 w-100">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        minLength="2"
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Button
                  className="btn btn-primary mt-4 w-100 p-3"
                  type="submit"
                >
                  Ingresar
                </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Universidad Nacional Jorge Basadre Grohmann
                </small>
              </Card.Footer>
            </Form>
          </Col>
          <Col sm={8} className=""></Col>
        </CardGroup>
      );
    }
  }
}
export default Admin;
