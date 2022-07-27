import React, { Component } from 'react';

import OptionFooter from '../components/OptionFooter';

class Footer extends Component {
  state = {
    OptionFooter: this.props.dataFooter,
  };

  render() {
    /* Comprobacion de dataFooter si es vacio */
    if (Object.keys(this.props.dataFooter).length == 0) {
      return <div></div>;
    } else {
      /* Comprobacion de las opciones de dataFooter si es vacio */
      if (!this.props.dataFooter.options.length) {
        return <div></div>;
      } else {
        let optionFooter;
        if (this.state.OptionFooter.theme == 1) {
          optionFooter = (
            <div className=" text-center text-md-start mt-5">
              <div className="row mt-3">
                {this.state.OptionFooter.options.map((e, index) => {
                  /* Comprobacion de las subOpciones de dataFooter si es vacio */
                  if (!e.texts.length) {
                    if (index == 0) {
                      return (
                        <div
                          className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                          key={index}
                        >
                          <h6 className="text-uppercase fw-bold mb-4">
                            {e.title}
                          </h6>
                          <div></div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                          key={index}
                        >
                          <h6 className="text-uppercase fw-bold mb-4">
                            {e.title}
                          </h6>
                        </div>
                      );
                    }
                  } else {
                    if (index == 0) {
                      return (
                        <div
                          className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                          key={index}
                        >
                          <h6 className="text-uppercase fw-bold mb-4">
                            {e.title}
                          </h6>
                          <div>
                            {e.texts.map((e, index) => (
                              <div key={index} className="lineBreak">
                                {e.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                          key={index}
                        >
                          <h6 className="text-uppercase fw-bold mb-4">
                            {e.title}
                          </h6>
                          <OptionFooter options={e.texts} />
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </div>
          );
        } else {
          optionFooter = (
            <div className=" text-center text-md-start mt-5">
              <div className="row mt-3">
                {this.state.OptionFooter.options.map((e, index) => {
                  /* Comprobacion de las subOpciones de dataFooter si es vacio */
                  if (!e.texts.length) {
                    return (
                      <div
                        className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                        key={index}
                      >
                        <h6 className="text-uppercase fw-bold mb-4">
                          {e.title}
                        </h6>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                        key={index}
                      >
                        <h6 className="text-uppercase fw-bold mb-4">
                          {e.title}
                        </h6>
                        <OptionFooter options={e.texts} />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        }
        return (
          <div
            className="footer text-center text-lg-start text-white"
            style={{ backgroundColor: this.state.OptionFooter.hexBackground }}
          >
            <div className="p-1">{optionFooter}</div>
          </div>
        );
      }
    }
  }
}

export default Footer;
