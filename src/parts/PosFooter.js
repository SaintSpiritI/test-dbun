import React, { Component } from 'react';

class posFooter extends Component {
  state = {
    PosFooter: this.props.dataPosFooter,
  };

  render() {
    /* Comprobacion de dataPosFooter si es vacio */
    if (Object.keys(this.props.dataPosFooter).length == 0) {
      return <div></div>;
    } else {
      return (
        <div
          className="posFooter text-center p-4"
          style={{ backgroundColor: this.state.PosFooter.hexBackground }}
        >
          <div>
            <p className="text-center text-white lineBreak">
              {this.state.PosFooter.text}
            </p>
          </div>
        </div>
      );
    }
  }
}

export default posFooter;
