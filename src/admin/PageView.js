import React, { Component } from 'react';

import SocialMedial from '../parts/SocialMedial';
import PreHeader from '../parts/PreHeader';
import Header from '../parts/Header';
import Menu from '../parts/Menu';
import Body from '../parts/Body';
import Footer from '../parts/Footer';
import PosFooter from '../parts/PosFooter';

class PageView extends Component {
  render() {
    let socialMedial;
    let preHeader;
    let header;
    let menu;
    let body;
    let footer;
    let posFooter;
    if (this.props.state.socialMedialStatus) {
      socialMedial = (
        <SocialMedial dataSocialMedial={this.props.state.socialMedial} />
      );
    }
    if (this.props.state.preHeaderStatus) {
      preHeader = <PreHeader dataPreHeader={this.props.state.preHeader} />;
    }
    if (this.props.state.headerStatus) {
      header = <Header dataHeader={this.props.state.header} />;
    }
    if (this.props.state.menuStatus) {
      menu = <Menu dataMenu={this.props.state.menu} />;
    }
    if (this.props.state.bodyStatus) {
      body = <Body dataBody={this.props.state.body} />;
    }
    if (this.props.state.footerStatus) {
      footer = <Footer dataFooter={this.props.state.footer} />;
    }
    if (this.props.state.posFooterStatus) {
      posFooter = <PosFooter dataPosFooter={this.props.state.posFooter} />;
    }
    if (this.props.state.settingStatus) {
      return (
        <div
          className="page"
          style={{
            backgroundColor: this.props.state.setting.hexBackground,
            padding: '0vw ' + this.props.state.setting.margin / 10 + 'vw',
            fontFamily: this.props.state.setting.font,
          }}
        >
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
export default PageView;
