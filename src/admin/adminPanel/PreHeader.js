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

import OptionPreHeader from './OptionPreHeader';

import { URL_ADMIN } from '../Const';

export default class PreHeader extends Component {
  state = {
    show: false,
    msm: false,
    msmStatus: false,
    validated: false,
    options: this.props.datos.options,
    hexBackground: this.props.datos.hexBackground,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  acuPreHeader = (e) => {
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

      fetch(URL_ADMIN + 'preHeaderShow.class.php', reqFontPage)
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

      fetch(URL_ADMIN + 'preHeaderShow.class.php', reqFontPage)
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
  };
  bgPreHeader = (e) => {
    console.log(e.target.value);
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        hexBackground: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'preHeaderColor.class.php', reqFontPage)
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
  newPreHeaderOption = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'preHeaderNewOption.class.php', reqFontPage)
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
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              Preencabezado
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
                onClick={this.acuPreHeader}
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
            <Offcanvas.Title>Preencabezado </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                      onChange={this.bgPreHeader}
                      className="w-25 mx-auto"
                      type="color"
                      defaultValue={this.state.hexBackground}
                    />
                  </OverlayTrigger>
                </Card.Body>
                {this.state.options.map((e) => {
                  return (
                    <OptionPreHeader
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
                      onClick={this.newPreHeaderOption}
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
