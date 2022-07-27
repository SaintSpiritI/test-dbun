import React, { Component } from 'react';

import Article from '../components/Article';

class Body extends Component {
  state = {
    Body: this.props.dataBody,
  };
  render() {
    /* Comprobacion de dataPreHeader si es vacio */
    if (Object.keys(this.props.dataBody).length == 0) {
      return <div></div>;
    } else {
      /* Comprobacion de las opciones de dataFooter si es vacio */
      if (!this.props.dataBody.articles.length) {
        return (
          <div style={{ backgroundColor: this.state.Body.hexBackground }}></div>
        );
      } else {
        return (
          <div style={{ backgroundColor: this.state.Body.hexBackground }}>
            <Article articles={this.state.Body.articles} />
          </div>
        );
      }
    }
  }
}

export default Body;
