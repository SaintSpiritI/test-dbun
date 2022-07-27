import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

class Message extends Component {
  state = {
    show: false,
    Message: this.props.dataMessage,
    MessageStatus: false,
  };

  componentDidMount() {
    /* Comprobacion de dataMessage si es vacio */
    if (Object.keys(this.props.dataMessage).length == 0) {
      return <div></div>;
    } else {
      this.setState({ MessageStatus: true });
      if (this.state.Message.condition == 1) {
        this.setState({ show: true });
      } else {
        this.setState({ show: false });
      }
    }
  }

  Close = () => {
    this.setState({ show: false });
  };

  render() {
    //console.log(this.props.dataMessage);

    /* Comprobacion de dataMessage si es vacio */
    if (Object.keys(this.props.dataMessage).length == 0) {
      return <div></div>;
    } else {
      let type;

      if (this.state.Message.type <= 1) {
        type = <div></div>;
      }
      if (this.state.Message.type == 2) {
        type = (
          <Alert key="info" variant="info" className="text-center">
            !Informa
          </Alert>
        );
      }
      if (this.state.Message.type == 3) {
        type = (
          <Alert key="warning" variant="warning" className="text-center">
            !Aviso
          </Alert>
        );
      }
      if (this.state.Message.type >= 4) {
        type = (
          <Alert key="danger" variant="danger" className="text-center">
            !Alerta
          </Alert>
        );
      }
      if (this.state.Message.theme <= 1) {
        return (
          <Modal
            show={this.state.show}
            onHide={this.Close}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              {type}
              <CardGroup>
                <Card>
                  <Card.Img
                    variant="top"
                    className="my-auto"
                    style={{ maxHeight: '500px', objectFit: 'contain' }}
                    src={this.state.Message.imageAddress}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </Card>
                <Card>
                  <Modal.Body>
                    <Modal.Title id="contained-modal-title-vcenter text-center">
                      <div className="fs-2 text-center text-uppercase">
                        {this.state.Message.title}
                      </div>
                      <div className="fs-4 text-center text-capitalize">
                        {this.state.Message.subTitle}
                      </div>
                    </Modal.Title>
                    <div className="py-2 fs-6 text-center lineBreak">
                      {this.state.Message.content}
                    </div>
                    <Modal.Footer className="justify-content-center">
                      <Nav justify>
                        <Nav.Item>
                          <Nav.Link
                            href={this.state.Message.buttonUrl}
                            className="btn btn-primary text-white"
                          >
                            {this.state.Message.buttonText}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Modal.Footer>
                  </Modal.Body>
                </Card>
              </CardGroup>
            </Modal.Body>
          </Modal>
        );
      }
      if (this.state.Message.theme == 2) {
        return (
          <Modal
            show={this.state.show}
            onHide={this.Close}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              {type}
              <Modal.Title id="contained-modal-title-vcenter text-center">
                <div className="fs-2 text-center text-uppercase">
                  {this.state.Message.title}
                </div>
                <div className="fs-4 text-center text-capitalize">
                  {this.state.Message.subTitle}
                </div>
              </Modal.Title>
              <div className="py-2 fs-6 text-center lineBreak">
                {this.state.Message.content}
              </div>
              <div className="text-center">
                <Nav.Item>
                  <Nav.Link href="">
                    <div className="btn btn-primary">
                      {this.state.Message.buttonText}
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </div>
            </Modal.Body>
          </Modal>
        );
      }
      if (this.state.Message.theme >= 3) {
        return (
          <Modal
            show={this.state.show}
            onHide={this.Close}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              {type}
              <CardGroup>
                <Card>
                  <Modal.Body>
                    <Modal.Title id="contained-modal-title-vcenter text-start">
                      <div className="fs-2 text-start text-uppercase">
                        {this.state.Message.title}
                      </div>
                      <div className="fs-4 text-start text-capitalize">
                        {this.state.Message.subTitle}
                      </div>
                    </Modal.Title>
                    <div className="py-2 fs-6 text-start lineBreak">
                      {this.state.Message.content}
                    </div>
                    <Modal.Footer className="justify-content-center">
                      <Nav justify>
                        <Nav.Item>
                          <Nav.Link
                            href={this.state.Message.buttonUrl}
                            className="btn btn-primary text-white"
                          >
                            {this.state.Message.buttonText}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Modal.Footer>
                  </Modal.Body>
                </Card>
                <Card>
                  <Card.Img
                    variant="top"
                    className="my-auto"
                    style={{ maxHeight: '500px', objectFit: 'contain' }}
                    src={this.state.Message.imageAddress}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </Card>
              </CardGroup>
            </Modal.Body>
          </Modal>
        );
      }
    }
  }
}
export default Message;
