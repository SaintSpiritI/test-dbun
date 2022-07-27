import React, { Component } from 'react';

class OptionFooter extends Component {
  render() {
    return this.props.options.map((e, index) => (
      <p key={index}>
        <a href={e.url} className="text-reset">
          {e.text}
        </a>
      </p>
    ));
  }
}
export default OptionFooter;
