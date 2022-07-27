import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import SocialMedialOption from './SocialMedialOption';

export default class SocialMedial extends Component {
  state = {
    show: false,
    msm: false,
    msmStatus: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

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
              Redes Sociales
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
            <Offcanvas.Title>Redes Sociales</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {this.props.datos.options.map((e) => {
              return (
                <SocialMedialOption
                  key={e.id}
                  name={e.name}
                  datos={e}
                  pages={this.props.pages}
                />
              );
            })}
          </Offcanvas.Body>
          <ToastContainer className="p-3" position="bottom-center">
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
        <ToastContainer className="p-3" position="bottom-center">
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
