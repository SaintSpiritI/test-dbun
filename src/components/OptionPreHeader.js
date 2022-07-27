import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

class OptionPreHeader extends Component {
  render() {
    return Object.values(this.props.options).map((e, index) => (
      <Nav.Link href={e.url} className="text-light px-3" key={index}>
        {e.text}
      </Nav.Link>
    ));
  }
}
export default OptionPreHeader;
