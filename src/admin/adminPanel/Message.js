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

import { URL_ADMIN } from '../Const';

import M1 from '../asset/m1.svg';
import M2 from '../asset/m2.svg';
import M3 from '../asset/m3.svg';

export default class Message extends Component {
  state = {
    theme: this.props.datos.theme,
    show: false,
    msm: false,
    image: this.props.datos.imageAddress,
    msmStatus: false,
    validated: false,
    selectedFile: null,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  themeMessage = (e) => {
    this.setState({ theme: e.target.id });
  };
  acuMessage = (e) => {
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

      fetch(URL_ADMIN + 'messageShow.class.php', reqFontPage)
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

      fetch(URL_ADMIN + 'messageShow.class.php', reqFontPage)
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
  messageSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(e);
      const reqMessage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          title: e.target['4'].value,
          subTitle: e.target['5'].value,
          content: e.target['6'].value,
          buttonText: e.target['7'].value,
          buttonUrl: e.target['8'].value,
          theme: this.state.theme,
          type: e.target['3'].value,
        }),
      };
      console.log(reqMessage);
      fetch(URL_ADMIN + 'messageModify.class.php', reqMessage)
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
  messageImage = (e) => {
    const data = new FormData();
    data.append('message', e.target.files[0]);
    data.append('id', this.props.datos.id);
    axios
      .post(URL_ADMIN + 'messageImage.class.php', data)
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
  render() {
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              Mensage
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
                defaultChecked={this.props.datos.condition == 1 ? true : false}
                onClick={this.acuMessage}
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
            <Offcanvas.Title>Opciones del Mensaje</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.messageImage}
                />
                <img
                  src={this.state.image}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
            </Card>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.messageSubmit}
                className="w-100 text-end"
              >
                <Card.Body className="text-start">
                  <CardGroup className="justify-content-evenly text-center">
                    <Form.Group className="w-25">
                      <Form.Label htmlFor="1">
                        <img src={M1} className="w-100" />
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        id="1"
                        name="themeMessage"
                        aria-label="radio 1"
                        defaultChecked={
                          this.props.datos.theme == 1 ? true : false
                        }
                        onClick={this.themeMessage}
                      />
                    </Form.Group>
                    <Form.Group className="w-25">
                      <Form.Label htmlFor="2">
                        <img src={M2} className="w-100" />
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        id="2"
                        name="themeMessage"
                        aria-label="radio 2"
                        defaultChecked={
                          this.props.datos.theme == 2 ? true : false
                        }
                        onClick={this.themeMessage}
                      />
                    </Form.Group>
                    <Form.Group className="w-25">
                      <Form.Label htmlFor="3">
                        <img src={M3} className="w-100" />
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        id="3"
                        name="themeMessage"
                        aria-label="radio 3"
                        defaultChecked={
                          this.props.datos.theme == 3 ? true : false
                        }
                        onClick={this.themeMessage}
                      />
                    </Form.Group>
                  </CardGroup>
                  <Card.Body>
                    <Form.Label htmlFor="title">Tipo de Mensage</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={this.props.datos.type}
                    >
                      <option value="1">Mensage</option>
                      <option value="2">Informativa</option>
                      <option value="3">Advertencia</option>
                      <option value="4">Peligro</option>
                    </Form.Select>
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="title">TÍTULO</Form.Label>
                    <Form.Control
                      type="text"
                      id="title"
                      defaultValue={this.props.datos.title}
                    />
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="subTitle">SUB TÍTULO</Form.Label>
                    <Form.Control
                      type="text"
                      id="subTitle"
                      defaultValue={this.props.datos.subTitle}
                    />
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="content">CONTENIDO</Form.Label>
                    <Form.Control
                      type="text"
                      id="content"
                      className="lineBreak"
                      defaultValue={this.props.datos.content}
                      as="textarea"
                    />
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="buttonText">BOTÓN</Form.Label>
                    <ButtonGroup className="w-100" aria-label="First group">
                      <Form.Control
                        placeholder="BOTÓN"
                        type="text"
                        id="buttonText"
                        defaultValue={this.props.datos.buttonText}
                      />
                    </ButtonGroup>
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="buttonUrl">URL/LINK</Form.Label>
                    <ButtonGroup className="w-100" aria-label="First group">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">Enlace</Tooltip>
                        }
                      >
                        <Form.Control
                          placeholder="URL/LINK"
                          type="text"
                          id="buttonUrl"
                          defaultValue={this.props.datos.buttonUrl}
                        />
                      </OverlayTrigger>
                    </ButtonGroup>
                  </Card.Body>
                </Card.Body>
                <Button
                  variant="outline-primary"
                  className="w-50"
                  type="submit"
                >
                  Guardar Cambios
                </Button>
              </Form>
            </Card>
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
      </div>
    );
  }
}
