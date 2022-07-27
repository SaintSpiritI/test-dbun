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

import PreOptionMenu from './PreOptionMenu';

import { URL_ADMIN } from '../Const';

export default class Menu extends Component {
  state = {
    options: this.props.datos.options,
    hexBackground: this.props.datos.hexBackground,
    show: false,
    validated: false,
    msm: false,
    msmStatus: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  newOptionMenu = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'menuNewOption.class.php', reqFontPage)
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
  menuSubmit = (e) => {
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
          hexBackground: e.target['0'].value,
        }),
      };

      fetch(URL_ADMIN + 'menuColor.class.php', reqFontPage)
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
          className="w-100 my-3"
        >
          <ButtonGroup className="w-100" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              Menú
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
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.menuSubmit}
              className="w-100 my-2"
            >
              <Card className="text-end">
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
                </Card.Body>
                <Button
                  variant="outline-primary"
                  className="w-50 my-4 mx-auto"
                  type="submit"
                >
                  Guardar Cambios
                </Button>
              </Card>
            </Form>
            <Card>
              <Card.Body>
                {this.state.options.map((e) => {
                  return <PreOptionMenu key={e.id} name={e.text} datos={e} />;
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
                      onClick={this.newOptionMenu}
                    >
                      + Añadir Menú
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
