import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import OptionPreHeader from '../components/OptionPreHeader';

class PreHeader extends Component {
  state = {
    preHeader: [],
  };

  componentDidMount() {
    this.setState({ preHeader: this.props.dataPreHeader });
  }

  render() {
    //console.log(this.props.dataPreHeader);
    /* Comprobacion de dataPreHeader si es vacio */
    if (Object.keys(this.props.dataPreHeader).length == 0) {
      return <div></div>;
    } else {
      let dataOptionPreHeader;
      /* Comprobacion de las opciones de dataPreHeader si es vacio */
      if (Object.keys(this.props.dataPreHeader.options).length == 0) {
        dataOptionPreHeader = <div></div>;
      } else {
        dataOptionPreHeader = (
          <OptionPreHeader
            options={Object.values(this.props.dataPreHeader.options)}
          />
        );
      }
      return (
        <div
          className="preHeader"
          style={{ backgroundColor: this.props.dataPreHeader.hexBackground }}
        >
          <Navbar bg="ligth" expand="xl" className="d-flex justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex justify-content-evenly w-100 py-0 my-0">
                {dataOptionPreHeader}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

export default PreHeader;
