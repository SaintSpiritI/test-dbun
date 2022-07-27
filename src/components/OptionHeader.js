import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

class OptionHeader extends Component {
  render() {
    return this.props.options.map((e, index) => (
      <Nav.Link href={e.url} className="px-3" key={index}>
        {e.text}
      </Nav.Link>
    ));
  }
}
export default OptionHeader;
