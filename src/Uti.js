import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import md5 from 'md5';

import { URL_ADMIN } from './admin/Const';

import DashboardUti from './admin/uti/DashboardUti';

export default class Uti extends Component {
  state = {
    authUti: false,
    validData: false,
    key: null,
    user: null,
  };
  validData = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const user = e.target['0'].value;
      const pwd = md5(e.target['1'].value);
      const code = md5(e.target['2'].value);
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          u: user,
          p: pwd,
          c: code,
        }),
      };

      fetch(URL_ADMIN + 'loginUti.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ auth: false });
          } else {
            if (data.key.length == 60) {
              this.setState({
                key: data.key,
                user: e.target['0'].value,
                authUti: true,
              });
            }
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
    this.setState({ authUti: false });
  };
  render() {
    if (this.state.authUti && this.state.key.length == 60) {
      return <DashboardUti k={this.state.key} u={this.state.user} />;
    } else {
      return (
        <div className="w-100 vh-100 d-flex px-4">
          <Card
            className="d-flex m-auto"
            style={{
              width: '28rem',
              boxShadow: '0px 20px 40px 5px rgba(0,0,0,0.2)',
            }}
          >
            <Form
              noValidate
              validated={this.state.validData}
              onSubmit={this.validData}
              style={{ backgroundColor: '#FFFFFFcA' }}
              className="m-auto text-center w-100 pt-4"
            >
              <Card.Body>
                <Card.Title className="mb-3">Inicio de Sesion</Card.Title>
                <Card.Title className="mb-5">DBUN - UTI</Card.Title>
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
                <Form.Group>
                  <InputGroup hasValidation>
                    <FloatingLabel label="Codigo" className="mb-3 w-100">
                      <Form.Control
                        type="textarea"
                        placeholder="Codigo"
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
          </Card>
        </div>
      );
    }
  }
}
