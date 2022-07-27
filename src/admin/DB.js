import React, { Component } from 'react';
import { URL_ADMIN } from './Const';

import HeadDashboard from './HDB';

class Dashboard extends Component {
  state = {
    pages: [],
    fonts: [],
    pagesStatus: false,
    fontsStatus: false,
  };

  async componentDidMount() {
    const headers = { 'Content-Type': 'application/json' };
    /* ---pages--- */
    await fetch(URL_ADMIN + 'pages.class.php', {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ pages: data, pagesStatus: true }));
    /* ---fonts--- */
    await fetch(URL_ADMIN + 'fonts.class.php', {
      headers,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ fonts: data, fontsStatus: true }));
  }

  render() {
    if (this.state.pagesStatus && this.state.pagesStatus) {
      const statePage = this.state;
      return <HeadDashboard statePage={statePage} close={this.props.close} />;
    }
  }
}
export default Dashboard;
