import React, { Component } from 'react';
import Panel from './Panel';
import PageView from './PageView';
import { URL_ADMIN } from './Const';

class Panels extends Component {
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
    await fetch(URL_ADMIN + 'setting.class.php?id=' + this.props.pg.setting, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ setting: data, settingStatus: true }));

    /* ---message--- */
    await fetch(URL_ADMIN + 'message.class.php?id=' + this.props.pg.message, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ message: data, messageStatus: true }));

    /* ---socialMedial--- */
    await fetch(
      URL_ADMIN + 'socialMedial.class.php?id=' + this.props.pg.socialMedial,
      { headers }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ socialMedial: data, socialMedialStatus: true })
      );

    /* ---preHeader--- */
    await fetch(
      URL_ADMIN + 'preHeader.class.php?id=' + this.props.pg.preHeader,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ preHeader: data, preHeaderStatus: true })
      );

    /* ---header--- */
    await fetch(URL_ADMIN + 'header.class.php?id=' + this.props.pg.header, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ header: data, headerStatus: true }));

    /* ---menu--- */
    await fetch(URL_ADMIN + 'menu.class.php?id=' + this.props.pg.menu, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ menu: data, menuStatus: true }));

    /* ---body--- */
    await fetch(URL_ADMIN + 'body.class.php?id=' + this.props.pg.body, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ body: data, bodyStatus: true }));

    /* ---footer--- */
    await fetch(URL_ADMIN + 'footer.class.php?id=' + this.props.pg.footer, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ footer: data, footerStatus: true }));

    /* ---posFooter--- */
    await fetch(
      URL_ADMIN + 'posFooter.class.php?id=' + this.props.pg.posFooter,
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
    if (
      this.state.settingStatus &&
      this.state.messageStatus &&
      this.state.socialMedialStatus &&
      this.state.preHeaderStatus &&
      this.state.headerStatus &&
      this.state.menuStatus &&
      this.state.bodyStatus &&
      this.state.footerStatus &&
      this.state.posFooterStatus
    ) {
      return (
        <div className="w-100 d-flex">
          <div
            className="panelContainer h-100 p-4 overflow-scroll"
            style={{
              minWidth: '400px',
              maxWidth: '400px',
              backgroundColor: '#C8D9F0',
            }}
          >
            <Panel state={this.state} pages={this.props.pages} />
          </div>
          <div className="pageContainer overflow-scroll w-100 h-100 px-4 pt-4">
            <div
              className="h-100  "
              style={{
                padding: '0px 0px',
                backgroundColor: '#FFFFFFcA',
              }}
            >
              <PageView state={this.state} />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Panels;
