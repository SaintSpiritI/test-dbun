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
import axios from 'axios';

import OptionHeader from './OptionHeader';

import H1 from '../asset/h1.svg';
import H2 from '../asset/h2.svg';

import { URL_ADMIN } from '../Const';

export default class Header extends Component {
  state = {
    options: this.props.datos.options,
    theme: this.props.datos.theme,
    show: false,
    validated: false,
    hexBackground: this.props.datos.hexBackground,
    image: this.props.datos.imageAddress,
    msm: false,
    msmStatus: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  bgHeader = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        hexBackground: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'headerColor.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({
            msm: true,
            msmStatus: true,
            hexBackground: e.target.value,
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
  themeHeader = (e) => {
    this.setState({ theme: e.target.id });
  };
  headerSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const reqMessage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          imageSize: e.target['0'].value,
          theme: this.state.theme,
        }),
      };
      fetch(URL_ADMIN + 'headerModify.class.php', reqMessage)
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
  headerImage = (e) => {
    const data = new FormData();
    data.append('header', e.target.files[0]);
    data.append('id', this.props.datos.id);
    axios
      .post(URL_ADMIN + 'headerImage.class.php', data)
      .then((data) => {
        if (data.data.file == 'false') {
          this.setState({ msm: false, msmStatus: true });
        }
        if (data.data.file == 'true') {
          this.setState({
            msm: true,
            msmStatus: true,
            image: URL.createObjectURL(e.target.files[0]),
          });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  newOptionFooter = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'headerNewOption.class.php', reqFontPage)
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
  render() {
    //console.log(this.props.datos);
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-100" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
            Encabezado
            </Button>
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
            <Offcanvas.Title>Encabezado</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Card.Body className="text-center">
                <Card.Subtitle>Color de Fondo</Card.Subtitle>
                <Card.Body>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">Color de Fondo</Tooltip>
                    }
                  >
                    <Form.Control
                      onChange={this.bgHeader}
                      className="w-25 mx-auto"
                      type="color"
                      defaultValue={this.state.hexBackground}
                    />
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/webp,image/png,image/svg+xml"
                    onChange={this.headerImage}
                  />
                  <img
                    src={this.state.image}
                    className="w-100 my-2"
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </Card.Body>
                <Card className="text-center">
                  <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.headerSubmit}
                    className="w-100 text-center"
                  >
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          Tamaño de Imagen
                        </Tooltip>
                      }
                    >
                      <Form.Range
                        className="w-75 mx-auto my-4"
                        defaultValue={this.props.datos.imageSize}
                        min="1"
                        max="10"
                        onChange={this.imageSize}
                      />
                    </OverlayTrigger>
                    <Card.Subtitle>Estilo</Card.Subtitle>
                    <Card.Body>
                      <CardGroup className="justify-content-evenly text-center">
                        <Form.Group className="w-25">
                          <Form.Label htmlFor="1">
                            <img src={H1} className="w-100" />
                          </Form.Label>
                          <Form.Check
                            type="radio"
                            id="1"
                            name="themeHeader"
                            aria-label="radio 1"
                            defaultChecked={
                              this.props.datos.theme == 1 ? true : false
                            }
                            onClick={this.themeHeader}
                          />
                        </Form.Group>
                        <Form.Group className="w-25">
                          <Form.Label htmlFor="2">
                            <img src={H2} className="w-100" />
                          </Form.Label>
                          <Form.Check
                            type="radio"
                            id="2"
                            name="themeHeader"
                            aria-label="radio 2"
                            defaultChecked={
                              this.props.datos.theme == 2 ? true : false
                            }
                            onClick={this.themeHeader}
                          />
                        </Form.Group>
                      </CardGroup>
                    </Card.Body>
                    <Button
                      variant="outline-primary"
                      className="w-50 my-4"
                      type="submit"
                    >
                      Guardar Cambios
                    </Button>
                  </Form>
                </Card>
                <Form.Label className="m-3">OPCIONES</Form.Label>
                {this.state.options.map((e) => {
                  return (
                    <OptionHeader
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
                      onClick={this.newOptionFooter}
                    >
                      + Añadir Opciones
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card>
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
      </div>
    );
  }
}
