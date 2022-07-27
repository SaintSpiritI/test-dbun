import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import { URL_ADMIN } from '../Const';

export default class Users extends Component {
  state = {
    condition: this.props.datos.condition,
  };
  userCondition = () => {
    if (this.state.condition == 1) {
      const reqUsers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 2,
        }),
      };

      fetch(URL_ADMIN + 'userCondition.class.php', reqUsers)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
              condition: data.condition,
            });
          }
          setTimeout(() => {
            this.setState({ msmStatus: false });
          }, 1000);
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
    } else {
      const reqUsers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 1,
        }),
      };

      fetch(URL_ADMIN + 'userCondition.class.php', reqUsers)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
              condition: data.condition,
            });
          }
          setTimeout(() => {
            this.setState({ msmStatus: false });
          }, 1000);
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
    }
  };
  render() {
    return (
      <tr>
        <td>{this.props.datos.id}</td>
        <td style={{ wordBreak: 'break-all' }}>{this.props.datos.userName}</td>
        <td style={{ wordBreak: 'break-all' }}>{this.props.datos.passWord}</td>
        <td>{this.state.condition == 1 ? 'Activo' : 'Suspendido'}</td>
        <td>{this.props.datos.created}</td>
        <td>
          <Button
            onClick={this.userCondition}
            variant={
              this.state.condition == 1 ? 'outline-warning' : 'outline-success'
            }
          >
            {this.state.condition == 1 ? 'Suspender' : 'Activar'}
          </Button>
        </td>
      </tr>
    );
  }
}
