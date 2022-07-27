import React, { Component } from 'react';

import OptionSocialMedial from '../components/OptionSocialMedial';

class SocialMedial extends Component {
  state = {
    SocialMedial: this.props.dataSocialMedial,
  };
  render() {
    /* Comprobacion de dataSocialMedial si es vacio */
    if (Object.keys(this.props.dataSocialMedial).length == 0) {
      return (
        <div
          style={{ position: 'fixed', top: '50%', right: 0, zIndex: '1000' }}
        >
          <div className="d-flex flex-column"></div>
        </div>
      );
    } else {
      return (
        <div
          style={{ position: 'fixed', top: '50%', right: 0, zIndex: '1000' }}
        >
          <div className="d-flex flex-column">
            <OptionSocialMedial options={this.state.SocialMedial.options} />
          </div>
        </div>
      );
    }
  }
}

export default SocialMedial;
