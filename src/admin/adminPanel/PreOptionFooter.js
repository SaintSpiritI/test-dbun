import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import OptionFooter from './OptionFooter';

import { URL_ADMIN } from '../Const';

export default class PreOptionFooter extends Component {
  state = {
    show: false,
    msm: false,
    msmStatus: false,
    texts: this.props.datos.texts,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  nroFooterOption = (e) => {
    // ---Order Number Social Medial--- //
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'footerOrderOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => this.props.acuopt(data.msm))
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  dteFooterOption = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'footerDeleteOption.class.php', reqFontPage)
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
  optionFooterSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(e.target['0'].value);
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          title: e.target['0'].value,
        }),
      };

      fetch(URL_ADMIN + 'footerOptionModify.class.php', reqFontPage)
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
  newTextsFooter = (e) => {
    console.log(this.props.datos.id);
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'footerNewSubOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true, texts: data.texts });
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
              onChange={this.nroFooterOption}
              type="number"
              min="0"
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
            <Offcanvas.Title>Opción de Título</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.optionFooterSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Card.Body>
                    <Form.Label htmlFor="button">TITULO</Form.Label>
                    <ButtonToolbar
                      aria-label="Toolbar with button groups"
                      className="w-100"
                    >
                      <ButtonGroup className="w-100" aria-label="First group">
                        <Form.Control
                          placeholder="BOTÓN"
                          type="text"
                          defaultValue={this.props.datos.title}
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
                <Form.Label>OPCIONES</Form.Label>
                {this.state.texts.map((e) => {
                  return <OptionFooter key={e.id} name={e.text} datos={e} />;
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
                      onClick={this.newTextsFooter}
                    >
                      + Añadir Sub Opciones
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card>
            <Button
              variant="outline-danger"
              className="w-50 my-4 "
              onClick={this.dteFooterOption}
            >
              Eliminar Titulo
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
