import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

import Section from './Section';

import A1T1 from '../asset/a1s1.svg';
import A1T2 from '../asset/a1s2.svg';
import A2T1 from '../asset/a2s1.svg';
import A2T2 from '../asset/a2s2.svg';
import A2T3 from '../asset/a2s3.svg';
import A2T4 from '../asset/a2s4.svg';
import A3T1 from '../asset/a3s1.svg';
import A3T2 from '../asset/a3s2.svg';
import A3T3 from '../asset/a3s3.svg';
import A4T1 from '../asset/a4s1.svg';
import A4T2 from '../asset/a4s2.svg';
import A4T3 from '../asset/a4s3.svg';
import A4T4 from '../asset/a4s4.svg';

import { URL_ADMIN } from '../Const';

export default class Article extends Component {
  state = {
    show: false,
    imageArticle: this.props.datos.imageAddress,
    theme: this.props.datos.theme,
    hexBackground: this.props.datos.hexBackground,
    validated: false,
    msm: false,
    msmStatus: false,
    sections: this.props.datos.sections,
    title: this.props.datos.title,
    subTitle: this.props.datos.subTitle,
    content: this.props.datos.content,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  themeCarousel = (e) => {
    this.setState({ theme: e.target.id });
    const reqMessage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        theme: e.target.id,
      }),
    };
    fetch(URL_ADMIN + 'articleThemeModify.class.php', reqMessage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  themeInfo = (e) => {
    this.setState({ theme: e.target.id });
    const reqMessage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        theme: e.target.id,
      }),
    };
    fetch(URL_ADMIN + 'articleThemeModify.class.php', reqMessage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  themeInfoDinamic = (e) => {
    this.setState({ theme: e.target.id });
    const reqMessage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        theme: e.target.id,
      }),
    };
    fetch(URL_ADMIN + 'articleThemeModify.class.php', reqMessage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  themeEvent = (e) => {
    this.setState({ theme: e.target.id });
    const reqMessage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        theme: e.target.id,
      }),
    };
    fetch(URL_ADMIN + 'articleThemeModify.class.php', reqMessage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  bgArticle = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        hexBackground: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'articleColor.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({
            msm: true,
            msmStatus: true,
            hexBackground: e.target.value,
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
  };
  articleImage = (e) => {
    const data = new FormData();
    data.append('article', e.target.files[0]);
    data.append('id', this.props.datos.id);
    axios
      .post(URL_ADMIN + 'articleImage.class.php', data)
      .then((data) => {
        if (data.data.file == 'false') {
          this.setState({ msm: false, msmStatus: true });
        }
        if (data.data.file == 'true') {
          this.setState({
            msm: true,
            msmStatus: true,
            imageArticle: URL.createObjectURL(e.target.files[0]),
          });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  ArticleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const reqMessage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          title: e.target['0'].value,
          subTitle: e.target['1'].value,
          content: e.target['2'].value,
        }),
      };
      fetch(URL_ADMIN + 'articleModify.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
              title: e.target['0'].value,
              subTitle: e.target['1'].value,
              content: e.target['2'].value,
            });
          } else {
            this.setState({ msm: true, msmStatus: true });
          }
          setTimeout(() => {
            this.setState({ msmStatus: false });
          }, 1000);
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validated: true });
  };
  newSection = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'newSection.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({
            msm: true,
            msmStatus: true,
            sections: data.sections,
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
  };
  dteArticle = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'deleteArticle.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  nroArticle = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'OrderArticle.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  acuArticle = (e) => {
    if (e.target.checked) {
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 1,
        }),
      };

      fetch(URL_ADMIN + 'articleShow.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({ msm: true, msmStatus: true });
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
      const reqFontPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.datos.id,
          condition: 2,
        }),
      };

      fetch(URL_ADMIN + 'articleShow.class.php', reqFontPage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({ msm: true, msmStatus: true });
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
    let article;
    if (this.props.datos.type <= 1) {
      article = (
        <Card>
          <Card.Body className="text-start">
            <CardGroup className="justify-content-evenly text-center">
              <Form.Group className="w-25">
                <Form.Label htmlFor="1">
                  <img src={A1T1} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="1"
                  name="themeMessage"
                  aria-label="radio 1"
                  defaultChecked={this.state.theme == 1 ? true : false}
                  onClick={this.themeCarousel}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="2">
                  <img src={A1T2} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="2"
                  name="themeMessage"
                  aria-label="radio 2"
                  defaultChecked={this.state.theme == 2 ? true : false}
                  onClick={this.themeCarousel}
                />
              </Form.Group>
            </CardGroup>
          </Card.Body>
        </Card>
      );
    }
    if (this.props.datos.type == 2) {
      article = (
        <Card>
          <Card.Body className="text-start">
            <CardGroup className="justify-content-evenly text-center">
              <Form.Group className="w-25">
                <Form.Label htmlFor="1">
                  <img src={A2T1} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="1"
                  name="themeArticle"
                  aria-label="radio 1"
                  defaultChecked={this.state.theme == 1 ? true : false}
                  onClick={this.themeInfo}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="2">
                  <img src={A2T2} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="2"
                  name="themeArticle"
                  aria-label="radio 2"
                  defaultChecked={this.state.theme == 2 ? true : false}
                  onClick={this.themeInfo}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="3">
                  <img src={A2T3} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="3"
                  name="themeArticle"
                  aria-label="radio 3"
                  defaultChecked={this.state.theme == 3 ? true : false}
                  onClick={this.themeInfo}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="4">
                  <img src={A2T4} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="4"
                  name="themeArticle"
                  aria-label="radio 4"
                  defaultChecked={this.state.theme == 4 ? true : false}
                  onClick={this.themeInfo}
                />
              </Form.Group>
            </CardGroup>
          </Card.Body>
          <Card.Body className="text-start">
            {this.props.datos.theme == 2 ? (
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.articleImage}
                />
                <img
                  src={this.state.imageArticle}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
            ) : (
              <div></div>
            )}
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.ArticleSubmit}
              className="w-100 text-center"
            >
              <Card.Body className="text-start">
                <Form.Label htmlFor="title" className="my-3">
                  TÍTULO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  defaultValue={this.state.title}
                />
                <Form.Label htmlFor="subTitle" className="my-3">
                  SUB TÍTULO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="subTitle"
                  defaultValue={this.state.subTitle}
                />
                <Form.Label htmlFor="content" className="my-3">
                  CONTENIDO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="content"
                  className="lineBreak"
                  defaultValue={this.state.content}
                  as="textarea"
                />
              </Card.Body>
              <Button
                variant="outline-primary"
                className="w-50 mx-auto"
                type="submit"
              >
                Guardar Cambios
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }
    if (this.props.datos.type == 3) {
      article = (
        <Card>
          <Card.Body className="text-start">
            <CardGroup className="justify-content-evenly text-center">
              <Form.Group className="w-25">
                <Form.Label htmlFor="1">
                  <img src={A3T1} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="1"
                  name="themeInfoDinamic"
                  aria-label="radio 1"
                  defaultChecked={this.state.theme == 1 ? true : false}
                  onClick={this.themeInfoDinamic}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="2">
                  <img src={A3T2} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="2"
                  name="themeInfoDinamic"
                  aria-label="radio 2"
                  defaultChecked={this.state.theme == 2 ? true : false}
                  onClick={this.themeInfoDinamic}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="3">
                  <img src={A3T3} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="3"
                  name="themeInfoDinamic"
                  aria-label="radio 3"
                  defaultChecked={this.state.theme == 3 ? true : false}
                  onClick={this.themeInfoDinamic}
                />
              </Form.Group>
            </CardGroup>
          </Card.Body>
        </Card>
      );
    }
    if (this.props.datos.type >= 4) {
      article = (
        <Card>
          <Card.Body className="text-start">
            <CardGroup className="justify-content-evenly text-center">
              <Form.Group className="w-25">
                <Form.Label htmlFor="1">
                  <img src={A4T1} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="1"
                  name="themeEvent"
                  aria-label="radio 1"
                  defaultChecked={this.state.theme == 1 ? true : false}
                  onClick={this.themeEvent}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="2">
                  <img src={A4T2} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="2"
                  name="themeEvent"
                  aria-label="radio 2"
                  defaultChecked={this.state.theme == 2 ? true : false}
                  onClick={this.themeEvent}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="3">
                  <img src={A4T3} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="3"
                  name="themeEvent"
                  aria-label="radio 3"
                  defaultChecked={this.state.theme == 3 ? true : false}
                  onClick={this.themeEvent}
                />
              </Form.Group>
              <Form.Group className="w-25">
                <Form.Label htmlFor="4">
                  <img src={A4T4} className="w-100" />
                </Form.Label>
                <Form.Check
                  type="radio"
                  id="4"
                  name="themeEvent"
                  aria-label="radio 4"
                  defaultChecked={this.state.theme == 4 ? true : false}
                  onClick={this.themeEvent}
                />
              </Form.Group>
            </CardGroup>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-50" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              {this.props.datos.title}
            </Button>
          </ButtonGroup>
          <ButtonGroup className="w-25">
            <Form.Control
              className="text-center"
              placeholder="#"
              defaultValue={this.props.datos.orderNumber}
              onChange={this.nroArticle}
              type="number"
              min="0"
            />
          </ButtonGroup>
          <ButtonGroup className="w-25" aria-label="Third group">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">Ocultar/Mostrar</Tooltip>}
            >
              <Form.Check
                type="switch"
                className="m-auto"
                defaultChecked={this.props.datos.condition == 1 ? true : false}
                onClick={this.acuArticle}
              />
            </OverlayTrigger>
          </ButtonGroup>
        </ButtonToolbar>
        <Offcanvas
          style={{
            marginTop: '58px',
          }}
          show={this.state.show}
          onHide={this.handleClose}
          {...this.props}
          {...{ scroll: true, backdrop: false }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Artículo</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card>
              <Card.Body className="text-center">
                <Card.Subtitle>Color de Fondo</Card.Subtitle>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">Color de Fondo</Tooltip>
                  }
                >
                  <Form.Control
                    onChange={this.bgArticle}
                    className="w-25 mx-auto my-2"
                    type="color"
                    defaultValue={this.state.hexBackground}
                  />
                </OverlayTrigger>
              </Card.Body>
            </Card>
            {article}
            <Card>
              <Card.Body>
                <Card.Title>Contenido</Card.Title>
                {this.state.sections.map((e, index) => {
                  return (
                    <Section
                      key={index}
                      name={'Footer'}
                      datos={e}
                      theme={this.props.datos.theme}
                      type={this.props.datos.type}
                    />
                  );
                })}
              </Card.Body>
              <div>
                <ButtonGroup className="w-100 p-4" aria-label="First group">
                  <Button variant="outline-success" onClick={this.newSection}>
                    + Añadir Contenido
                  </Button>
                </ButtonGroup>
              </div>
            </Card>
            <Button
              variant="outline-danger"
              className="w-50 my-4 "
              onClick={this.dteArticle}
            >
              Eliminar
            </Button>
          </Offcanvas.Body>
          <ToastContainer className="p-3 text-center" position="bottom-center">
            {this.state.msm ? (
              <Toast bg="success" show={this.state.msmStatus}>
                <Toast.Body>Operacion Exitosa</Toast.Body>
              </Toast>
            ) : (
              <Toast bg="warning" show={this.state.msmStatus}>
                <Toast.Body>Operacion Erronea</Toast.Body>
              </Toast>
            )}
          </ToastContainer>
        </Offcanvas>
        <ToastContainer className="p-3 text-center" position="bottom-center">
          {this.state.msm ? (
            <Toast bg="success" show={this.state.msmStatus}>
              <Toast.Body>Operacion Exitosa</Toast.Body>
            </Toast>
          ) : (
            <Toast bg="warning" show={this.state.msmStatus}>
              <Toast.Body>Operacion Erronea</Toast.Body>
            </Toast>
          )}
        </ToastContainer>
      </div>
    );
  }
}
