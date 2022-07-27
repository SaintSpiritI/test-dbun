import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import OptionMenu from './OptionMenu';

import { URL_ADMIN } from '../Const';

export default class PreOptionMenu extends Component {
  state = {
    show: false,
    msm: false,
    msmStatus: false,
    text: this.props.datos.text,
    url: this.props.datos.url,
    subOptions: this.props.datos.subOptions,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  nroMenuOption = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'menuOrderOption.class.php', reqFontPage)
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
  optionMenuSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          text: e.target['0'].value,
          url: e.target['1'].value,
        }),
      };

      fetch(URL_ADMIN + 'menuOptionModify.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
              text: e.target['0'].value,
              url: e.target['1'].value,
            });
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
  dteMenuOption = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'menuDeleteOption.class.php', reqFontPage)
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
  newMenuSubOption = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'menuNewSubOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({
            msm: true,
            msmStatus: true,
            subOptions: data.subOptions,
          });
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
              onChange={this.nroMenuOption}
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
            <Offcanvas.Title>Opción de Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.optionMenuSubmit}
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
                          defaultValue={this.state.text}
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
                          defaultValue={this.state.url}
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
              <Card.Body>
                {this.state.subOptions.map((e) => {
                  return (
                    <OptionMenu
                      key={e.id}
                      name={e.text}
                      datos={e}
                      pages={this.props.pages}
                    />
                  );
                })}
              </Card.Body>
              <div>
                <ButtonToolbar
                  aria-label="Toolbar with button groups"
                  className="w-100 p-4"
                >
                  <ButtonGroup className="w-100" aria-label="First group">
                    <Button
                      variant="outline-success"
                      onClick={this.newMenuSubOption}
                    >
                      + Añadir Sub Menú
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card>
            <Button
              variant="outline-danger"
              className="w-50 my-4"
              onClick={this.dteMenuOption}
            >
              Eliminar
            </Button>
          </Offcanvas.Body>
          <ToastContainer className="p-3 text-center" position="bottom-center">
            {this.state.msm ? (
              <Toast bg="success" show={this.state.msmStatus}>
                <Toast.Body>Operacion Exitosa</Toast.Body>
              </Toast>
            ) : (
              <Toast bg="warning" show={this.state.msmStatus}>
                <Toast.Body>Operacion Erronea</Toast.Body>
              </Toast>
            )}
          </ToastContainer>
        </Offcanvas>
        <ToastContainer className="p-3 text-center" position="bottom-center">
          {this.state.msm ? (
            <Toast bg="success" show={this.state.msmStatus}>
              <Toast.Body>Operacion Exitosa</Toast.Body>
            </Toast>
          ) : (
            <Toast bg="warning" show={this.state.msmStatus}>
              <Toast.Body>Operacion Erronea</Toast.Body>
            </Toast>
          )}
        </ToastContainer>
      </div>
    );
  }
}
