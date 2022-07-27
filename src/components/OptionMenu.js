import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import SubOptionMenu from './SubOptionMenu';

class OptionMenu extends Component {
  state = {
    options: this.props.options,
  };
  render() {
    return this.state.options.map((e, index) => {
      let dataSubOptionMenu;
      /* Comprobacion de las opciones de dataPreHeader si es vacio */
      if (!e.subOptions.length) {
        dataSubOptionMenu = <div></div>;
      } else {
        dataSubOptionMenu = <SubOptionMenu subOptions={e.subOptions} />;
      }
      if (e.url == '') {
        if (!e.subOptions.length) {
          return (
            <Nav.Link href={e.url} key={index}>
              {e.text}
            </Nav.Link>
          );
        } else {
          return (
            <NavDropdown title={e.text} id="basic-nav-dropdown" key={index}>
              {dataSubOptionMenu}
            </NavDropdown>
          );
        }
      } else {
        if (!e.subOptions.length) {
          return (
            <Nav.Link href={e.url} key={index}>
              {e.text}
            </Nav.Link>
          );
        } else {
          return (
            <NavDropdown title={e.text} id="basic-nav-dropdown" key={index}>
              {dataSubOptionMenu}
            </NavDropdown>
          );
        }
      }
    });
  }
}

export default OptionMenu;
