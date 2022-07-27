import React, { Component } from 'react';

import Message from './parts/Message';
import SocialMedial from './parts/SocialMedial';
import PreHeader from './parts/PreHeader';
import Header from './parts/Header';
import Menu from './parts/Menu';
import Body from './parts/Body';
import Footer from './parts/Footer';
import PosFooter from './parts/PosFooter';

import { URL_HOST } from './admin/Const';

class PagePublic extends Component {
  state = {
    setting: [],
    message: [],
    socialMedial: [],
    preHeader: [],
    header: [],
    menu: [],
    body: [],
    footer: [],
    posFooter: [],
    settingStatus: false,
    messageStatus: false,
    socialMedialStatus: false,
    preHeaderStatus: false,
    headerStatus: false,
    menuStatus: false,
    bodyStatus: false,
    footerStatus: false,
    posFooterStatus: false,
  };

  async componentDidMount() {
    const headers = { 'Content-Type': 'application/json' };
    /* ---setting--- */
    await fetch(URL_HOST + 'setting.class.php?id=' + this.props.data.setting, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ setting: data, settingStatus: true }));

    /* ---message--- */
    await fetch(URL_HOST + 'message.class.php?id=' + this.props.data.message, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ message: data, messageStatus: true }));

    /* ---socialMedial--- */
    await fetch(
      URL_HOST + 'socialMedial.class.php?id=' + this.props.data.socialMedial,
      { headers }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ socialMedial: data, socialMedialStatus: true })
      );

    /* ---preHeader--- */

    await fetch(
      URL_HOST + 'preHeader.class.php?id=' + this.props.data.preHeader,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ preHeader: data, preHeaderStatus: true })
      );

    /* ---header--- */
    await fetch(URL_HOST + 'header.class.php?id=' + this.props.data.header, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ header: data, headerStatus: true }));

    /* ---menu--- */
    await fetch(URL_HOST + 'menu.class.php?id=' + this.props.data.menu, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ menu: data, menuStatus: true }));

    /* ---body--- */
    await fetch(URL_HOST + 'body.class.php?id=' + this.props.data.body, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ body: data, bodyStatus: true }));

    /* ---footer--- */
    await fetch(URL_HOST + 'footer.class.php?id=' + this.props.data.footer, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ footer: data, footerStatus: true }));

    /* ---posFooter--- */
    await fetch(
      URL_HOST + 'posFooter.class.php?id=' + this.props.data.posFooter,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ posFooter: data, posFooterStatus: true })
      );
  }

  render() {
    let message;
    let socialMedial;
    let preHeader;
    let header;
    let menu;
    let body;
    let footer;
    let posFooter;
    if (this.props.home == 'home') {
      if (this.state.messageStatus) {
        message = <Message dataMessage={this.state.message} />;
      }
    } else {
      message = <div></div>;
    }
    if (this.state.socialMedialStatus) {
      socialMedial = (
        <SocialMedial dataSocialMedial={this.state.socialMedial} />
      );
    }
    if (this.state.preHeaderStatus) {
      if (this.state.preHeader.condition == 1) {
        preHeader = <PreHeader dataPreHeader={this.state.preHeader} />;
      } else {
        preHeader = <div></div>;
      }
    } else {
      preHeader = <div></div>;
    }
    if (this.state.headerStatus) {
      header = <Header dataHeader={this.state.header} />;
    }
    if (this.state.menuStatus) {
      menu = <Menu dataMenu={this.state.menu} />;
    }
    if (this.state.bodyStatus) {
      body = <Body dataBody={this.state.body} />;
    }
    if (this.state.footerStatus) {
      if (this.state.footer.condition == 1) {
        footer = <Footer dataFooter={this.state.footer} />;
      } else {
        footer = <div></div>;
      }
    }
    if (this.state.posFooterStatus) {
      if (this.state.posFooter.condition == 1) {
        posFooter = <PosFooter dataPosFooter={this.state.posFooter} />;
      } else {
        posFooter = <div></div>;
      }
    } else {
      posFooter = <div></div>;
    }
    if (this.state.settingStatus) {
      return (
        <div
          className="page"
          style={{
            backgroundColor: this.state.setting.hexBackground,
            padding: '0vw ' + this.state.setting.margin + 'vw',
            fontFamily: this.state.setting.font,
          }}
        >
          {message}
          {socialMedial}
          {preHeader}
          {header}
          {menu}
          {body}
          {footer}
          {posFooter}
        </div>
      );
    }
  }
}
export default PagePublic;
