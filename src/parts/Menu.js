import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import OptionMenu from '../components/OptionMenu';

class Menu extends Component {
  state = {
    Menu: this.props.dataMenu,
  };

  render() {
    /* Comprobacion de dataPreHeader si es vacio */
    if (Object.keys(this.props.dataMenu).length == 0) {
      return <div></div>;
    } else {
      let dataOptionMenu;
      /* Comprobacion de las opciones de dataPreHeader si es vacio */
      if (!this.props.dataMenu.options.length) {
        dataOptionMenu = <div></div>;
      } else {
        dataOptionMenu = <OptionMenu options={this.state.Menu.options} />;
      }
      return (
        <div
          className="menu"
          style={{ backgroundColor: this.state.Menu.hexBackground }}
        >
          <Navbar expand="lg" className="d-flex justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto"
                className="d-flex justify-content-evenly w-100"
                style={{ backgroundColor: this.state.Menu.hexBackground }}
              >
                {dataOptionMenu}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

export default Menu;
