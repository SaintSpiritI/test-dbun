import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { URL_ADMIN } from '../Const';

export default class OptionPreHeader extends Component {
  state = {
    show: false,
    msm: false,
    msmStatus: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  nroPreHeaderOption = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'preHeaderOrderOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
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
  optionPreHeaderSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(e.target['0'].value);
      console.log(e.target['1'].value);
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          text: e.target['0'].value,
          url: e.target['1'].value,
        }),
      };

      fetch(URL_ADMIN + 'preHeaderOptionModify.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({ msm: true, msmStatus: true });
          }
          setTimeout(() => {
            this.setState({ msmStatus: false });
          }, 1000);
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validated: true });
  };
  dtePreHeaderOption = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'preHeaderDeleteOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
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
  render() {
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 m-2"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              {this.props.name}
            </Button>
          </ButtonGroup>
          <ButtonGroup className="w-25" aria-label="First group">
            <Form.Control
              className="text-center"
              placeholder="#"
              defaultValue={this.props.datos.orderNumber}
              type="number"
              min="0"
              onChange={this.nroPreHeaderOption}
            />
          </ButtonGroup>
        </ButtonToolbar>
        <Offcanvas
          style={{
            marginTop: '58px',
          }}
          show={this.state.show}
          onHide={this.handleClose}
          {...this.props}
          {...{ scroll: true, backdrop: false }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Option</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.optionPreHeaderSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Card.Body>
                    <Form.Label htmlFor="button">NOMBRE</Form.Label>
                    <ButtonToolbar
                      aria-label="Toolbar with button groups"
                      className="w-100"
                    >
                      <ButtonGroup className="w-100" aria-label="First group">
                        <Form.Control
                          placeholder="BOTÓN"
                          type="text"
                          defaultValue={this.props.datos.text}
                        />
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="button">URL/LINK</Form.Label>
                    <ButtonToolbar
                      aria-label="Toolbar with button groups"
                      className="w-100"
                    >
                      <ButtonGroup className="w-100" aria-label="First group">
                        <Form.Control
                          placeholder="BOTÓN"
                          type="text"
                          defaultValue={this.props.datos.url}
                        />
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Card.Body>
                </Card.Body>

                <Button
                  variant="outline-primary"
                  className="w-50 mb-4 "
                  type="submit"
                >
                  Guardar Cambios
                </Button>
              </Form>
            </Card>
            <Button
              variant="outline-danger"
              className="w-50 my-4 "
              onClick={this.dtePreHeaderOption}
            >
              Eliminar
            </Button>

            <ToastContainer
              className="p-3 text-center"
              position="bottom-center"
            >
              {this.state.msm ? (
                <Toast bg="success" show={this.state.msmStatus}>
                  <Toast.Body>Operacion Exitosa</Toast.Body>{' '}
                </Toast>
              ) : (
                <Toast bg="warning" show={this.state.msmStatus}>
                  <Toast.Body>Operacion Erronea</Toast.Body>{' '}
                </Toast>
              )}
            </ToastContainer>
          </Offcanvas.Body>
        </Offcanvas>

        <ToastContainer className="p-3 text-center" position="bottom-center">
          {this.state.msm ? (
            <Toast bg="success" show={this.state.msmStatus}>
              <Toast.Body>Operacion Exitosa</Toast.Body>{' '}
            </Toast>
          ) : (
            <Toast bg="warning" show={this.state.msmStatus}>
              <Toast.Body>Operacion Erronea</Toast.Body>{' '}
            </Toast>
          )}
        </ToastContainer>
      </div>
    );
  }
}
