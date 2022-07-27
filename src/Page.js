import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import PagePublic from './PagePublic';
import Error from './Error';

import { URL_HOST } from './admin/Const';

function callParams(Component) {
  return (props) => {
    return <Component {...props} page={useParams()} />;
  };
}

class Page extends Component {
  state = {
    pg: [],
    pgStatus: false,
    error: false,
  };

  async componentDidMount() {
    const requestPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.props.page.id ? this.props.page.id : 'home',
      }),
    };

    /* ---page--- */
    await fetch(URL_HOST + 'page.class.php', requestPage)
      .then((response) => response.json())
      .then((data) => this.setState({ pg: data, pgStatus: true }))
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  }

  render() {
    /* ------ Redirect ----- */
    if (this.props.home) {
      return <Navigate to="/home" replace />;
    } else {
      if (this.state.pgStatus) {
        return <PagePublic data={this.state.pg} home={this.props.page.id} />;
      }
      if (this.state.error) {
        return <Error />;
      }
    }
  }
}
export default callParams(Page);
