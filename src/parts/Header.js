import React, { Component } from 'react';
import OptionHeader from '../components/OptionHeader';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends Component {
  state = {
    Header: this.props.dataHeader,
  };

  render() {
    /* Comprobacion de dataHeader si es vacio */
    if (Object.keys(this.props.dataHeader).length == 0) {
      return <div></div>;
    } else {
      let dataOptionHeader;
      let header;
      let image;
      /* Comprobacion de las opciones de dataHeader si es vacio */
      if (!this.props.dataHeader.options.length) {
        dataOptionHeader = <div></div>;
      } else {
        dataOptionHeader = <OptionHeader options={this.state.Header.options} />;
      }

      image = (
        <Navbar.Brand
          href="/home"
          className="d-flex justify-content-center p-2"
        >
          <img
            src={this.state.Header.imageAddress}
            style={{
              width: 50 * this.state.Header.imageSize,
              maxWidth: '60vw',
            }}
            onError={(e) => (e.target.style.display = 'none')}
          />
        </Navbar.Brand>
      );

      header = (
        <div>
          <Navbar
            bg="ligth"
            expand="xl"
            className={
              this.state.Header.theme == 1
                ? 'd-flex flex-row w-100 justify-content-between'
                : 'd-flex flex-column w-100 justify-content-between'
            }
          >
            {image}
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex justify-content-evenly w-100 p-2">
                {dataOptionHeader}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );

      return (
        <div
          className="header"
          style={{ backgroundColor: this.state.Header.hexBackground }}
        >
          {header}
        </div>
      );
    }
  }
}
export default Header;
