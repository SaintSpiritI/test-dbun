import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { TEXT_REGEX } from '../Const';
import { URL_ADMIN } from '../Const';

export default class PosFooter extends Component {
  state = {
    validated: false,
    vText: false,
    show: false,
    msm: false,
    msmStatus: false,
    hexBackground: this.props.datos.hexBackground,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  posFooterSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (TEXT_REGEX.test(e.target['1'].value)) {
        const reqFontPage = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.props.datos.id,
            hexBackground: e.target['0'].value,
            text: e.target['1'].value,
          }),
        };

        fetch(URL_ADMIN + 'posFooterModify.class.php', reqFontPage)
          .then((response) => response.json())
          .then((data) => {
            if (data.msm == 'false') {
              this.setState({ msm: false, msmStatus: true });
            } else {
              this.setState({
                msm: true,
                msmStatus: true,
                hexBackground: e.target['0'].value,
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
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validated: true });
  };
  acuPosFooter = (e) => {
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

      fetch(URL_ADMIN + 'posFooterShow.class.php', reqFontPage)
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

      fetch(URL_ADMIN + 'posFooterShow.class.php', reqFontPage)
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
  render() {
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              Pos Pie de página
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
                onClick={this.acuPosFooter}
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
            <Offcanvas.Title>Pos Pie de página</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.posFooterSubmit}
              className="w-100 text-end"
            >
              <Card>
                <Card.Body className="text-center">
                  <Card.Subtitle>Color de Fondo</Card.Subtitle>
                  <Card.Body>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">Fondo de Pagina</Tooltip>
                      }
                    >
                      <Form.Control
                        className="w-25 mx-auto"
                        type="color"
                        defaultValue={this.state.hexBackground}
                      />
                    </OverlayTrigger>
                  </Card.Body>
                  <Card.Body>
                    <Form.Label htmlFor="content">CONTENIDO</Form.Label>
                    <Form.Control
                      type="text"
                      id="content"
                      onChange={(e) => {
                        TEXT_REGEX.test(e.target.value)
                          ? this.setState({ vText: false })
                          : this.setState({ vText: true });
                      }}
                      isInvalid={this.state.vText}
                      defaultValue={this.props.datos.text}
                      aria-describedby="textTareaHelpBlock"
                      as="textarea"
                    />
                    <Form.Control.Feedback type="invalid">
                      Un caracter no es valido.
                    </Form.Control.Feedback>
                  </Card.Body>
                </Card.Body>
              </Card>
              <Button
                variant="outline-primary"
                className="w-50 my-4"
                type="submit"
              >
                Guardar Cambios
              </Button>
            </Form>
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
