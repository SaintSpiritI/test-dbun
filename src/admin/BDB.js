import React, { Component } from 'react';

import Panels from './Panels';

import { URL_ADMIN } from './Const';

class BodyDashboard extends Component {
  state = {
    pg: [],
    pgStatus: false,
  };
  async componentDidMount() {
    const requestPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.props.page,
      }),
    };

    // ---page--- //
    await fetch(URL_ADMIN + '/page.class.php', requestPage)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pg: data, pgStatus: true });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  }
  render() {
    if (this.state.pgStatus) {
      return <Panels pg={this.state.pg} pages={this.props.pages} />;
    }
  }
}
export default BodyDashboard;
