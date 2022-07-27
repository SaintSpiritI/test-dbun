import React, { Component } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

class SubOptionMenu extends Component {
  render() {
    return this.props.subOptions.map((e, index) => (
      <NavDropdown.Item href={e.url} key={index}>
        {e.text}
      </NavDropdown.Item>
    ));
  }
}

export default SubOptionMenu;
