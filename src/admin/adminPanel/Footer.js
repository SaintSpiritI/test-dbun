import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import PreOptionFooter from './PreOptionFooter';

import { URL_ADMIN } from '../Const';

import F1 from '../asset/f1.svg';
import F2 from '../asset/f2.svg';

export default class Footer extends Component {
  state = {
    options: this.props.datos.options,
    show: false,
    validated: false,
    msm: false,
    msmStatus: false,
    theme: this.props.datos.theme,
    hexBackground: this.props.datos.hexBackground,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  themeFooter = (e) => {
    this.setState({ theme: e.target.id });
  };
  acuFooter = (e) => {
    if (e.target.checked) {
      // ---show posFooter--- //
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 1,
        }),
      };

      fetch(URL_ADMIN + 'footerShow.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
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
    } else {
      // ---hiden posFooter--- //
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 2,
        }),
      };

      fetch(URL_ADMIN + 'footerShow.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
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
    }
  };
  footerSubmit = (e) => {
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
          hexBackground: e.target['2'].value,
          theme: this.state.theme,
        }),
      };

      fetch(URL_ADMIN + 'footerModify.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
              hexBackground: e.target['2'].value,
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
  newTitleFooter = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'footerNewOption.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true, options: data.options });
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
  acuopt = (res) => {
    if (res == 'false') {
      this.setState({ msm: false, msmStatus: true });
    } else {
      this.setState({ msm: true, msmStatus: true });
    }
    setTimeout(() => {
      this.setState({ msmStatus: false });
    }, 1000);
  };
  render() {
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              Pie de página
            </Button>
          </ButtonGroup>
          <ButtonGroup className="w-25" aria-label="Second group">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">Ocultar/Mostrar</Tooltip>}
            >
              <Form.Check
                type="switch"
                className="m-auto"
                onClick={this.acuFooter}
                defaultChecked={this.props.datos.condition == 1 ? true : false}
              />
            </OverlayTrigger>
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
            <Offcanvas.Title>Pie de página</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.footerSubmit}
                className="w-100 text-center"
              >
                <Card.Subtitle className="my-4">Estilo de Footer</Card.Subtitle>
                <CardGroup className="justify-content-evenly text-center">
                  <Form.Group className="w-25">
                    <Form.Label htmlFor="1">
                      <img src={F1} className="w-100" />
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      id="1"
                      name="themeMessage"
                      aria-label="radio 2"
                      defaultChecked={
                        this.props.datos.theme == 1 ? true : false
                      }
                      onClick={this.themeFooter}
                    />
                  </Form.Group>
                  <Form.Group className="w-25">
                    <Form.Label htmlFor="2">
                      <img src={F2} className="w-100" />
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      id="2"
                      name="themeMessage"
                      aria-label="radio 3"
                      defaultChecked={
                        this.props.datos.theme == 2 ? true : false
                      }
                      onClick={this.themeFooter}
                    />
                  </Form.Group>
                </CardGroup>
                <Card.Body className="text-center">
                  <Card.Subtitle>Color de Fondo</Card.Subtitle>
                  <Card.Body>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">Fondo de Footer</Tooltip>
                      }
                    >
                      <Form.Control
                        className="w-25 mx-auto"
                        type="color"
                        defaultValue={this.state.hexBackground}
                      />
                    </OverlayTrigger>
                  </Card.Body>
                  <Button
                    variant="outline-primary"
                    className="w-50 my-4"
                    type="submit"
                  >
                    Guardar Cambios
                  </Button>
                </Card.Body>
              </Form>
              <Card.Body>
                <Form.Label>OPCIONES</Form.Label>
                {this.state.options.map((e) => {
                  return (
                    <PreOptionFooter
                      key={e.id}
                      name={e.title}
                      datos={e}
                      pages={this.props.pages}
                      acuopt={this.acuopt}
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
                      onClick={this.newTitleFooter}
                    >
                      + Añadir Optiones
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card>
          </Offcanvas.Body>
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
        </Offcanvas>
      </div>
    );
  }
}
