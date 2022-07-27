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
import { URL_REGEX } from '../Const';

export default class SocialMedialOption extends Component {
  state = {
    show: false,
    validated: false,
    msm: false,
    msmStatus: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  acuSocialMedial = (e) => {
    if (e.target.checked) {
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 1,
        }),
      };

      fetch(URL_ADMIN + 'socialMedialShow.class.php', reqFontPage)
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
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 2,
        }),
      };

      fetch(URL_ADMIN + 'socialMedialShow.class.php', reqFontPage)
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
  nroSocialMedial = (e) => {
    // ---Order Number Social Medial--- //
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'socialMedialOrder.class.php', reqFontPage)
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
  socialMedialSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (URL_REGEX.test(e.target['0'].value)) {
        //console.log(e.target['0'].value);
        // ---data posFooter--- //
        const reqFontPage = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.props.datos.id,
            url: e.target['0'].value,
          }),
        };

        fetch(URL_ADMIN + 'socialMedialModify.class.php', reqFontPage)
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
      }
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validated: true });
  };
  render() {
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 m-2"
        >
          <ButtonGroup className="w-50" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              {this.props.name}
            </Button>
          </ButtonGroup>
          <ButtonGroup className="w-25" aria-label="First group">
            <Form.Control
              className="text-center"
              placeholder="#"
              defaultValue={this.props.datos.orderNumber}
              onChange={this.nroSocialMedial}
              type="number"
              min="0"
            />
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
                onClick={this.acuSocialMedial}
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
            <Offcanvas.Title>{this.props.datos.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.socialMedialSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
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
                          defaultValue={this.props.datos.address}
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
