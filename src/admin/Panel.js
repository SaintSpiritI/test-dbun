import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import SocialMedial from './adminPanel/SocialMedial';
import Message from './adminPanel/Message';
import PosFooter from './adminPanel/PosFooter';
import Footer from './adminPanel/Footer';
import PreHeader from './adminPanel/PreHeader';
import Header from './adminPanel/Header';
import Menu from './adminPanel/Menu';
import Article from './adminPanel/Article';

import { URL_ADMIN } from './Const';

import T1 from './asset/a1s1.svg';
import T2 from './asset/a2s1.svg';
import T3 from './asset/a3s1.svg';
import T4 from './asset/a4s1.svg';

export default class Panel extends Component {
  state = {
    msm: false,
    msmStatus: false,
    articles: this.props.state.body.articles,
    articleShow: false,
    type: 1,
    bodyStatus: this.props.state.bodyStatus,
  };
  typeNewArticle = (e) => {
    this.setState({ type: e.target.id });
  };
  CreateArticleShow = () => {
    this.setState({ articleShow: true });
  };
  CreateArticleClose = () => {
    this.setState({ articleShow: false });
  };
  CreateArticle = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.state.body.id,
        type: this.state.type,
      }),
    };

    fetch(URL_ADMIN + 'bodyNewArticle.class.php', reqFontPage)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({
            msm: true,
            msmStatus: true,
            articles: data.articles,
            bodyStatus: false,
          });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false, bodyStatus: true });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
    this.setState({ articleShow: false });
  };
  render() {
    if (this.state.bodyStatus) {
      return (
        <div>
          <Card className="text-center">
            <Card.Header>
              <Card.Body>
                {this.props.state.preHeaderStatus ? (
                  <PreHeader
                    key={-1}
                    name={'PreHeader'}
                    datos={this.props.state.preHeader}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
                {this.props.state.headerStatus ? (
                  <Header
                    key={-2}
                    name={'Header'}
                    datos={this.props.state.header}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
                {this.props.state.headerStatus ? (
                  <Menu
                    key={-3}
                    name={'Menu'}
                    datos={this.props.state.menu}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card.Header>
            <Card.Body>
              <Card.Body>
                {this.state.articles.map((e, index) => {
                  return (
                    <Article
                      key={index}
                      name={'Article'}
                      datos={e}
                      pages={this.props.pages}
                    />
                  );
                })}
                <div>
                  <ButtonToolbar
                    aria-label="Toolbar with button groups"
                    className="w-100 my-3"
                  >
                    <ButtonGroup className="w-100" aria-label="First group">
                      <Button
                        variant="outline-success"
                        onClick={this.CreateArticleShow}
                      >
                        + Añadir Artículo
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </div>
              </Card.Body>
            </Card.Body>
            <Card.Footer>
              <Card.Body>
                {this.props.state.footerStatus ? (
                  <Footer
                    key={-4}
                    name={'Footer'}
                    datos={this.props.state.footer}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}

                {this.props.state.posFooterStatus ? (
                  <PosFooter
                    key={-5}
                    name={'PosFooter'}
                    datos={this.props.state.posFooter}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card.Footer>
            <Card.Footer>
              <Card.Body>
                {this.props.state.messageStatus ? (
                  <Message
                    key={-7}
                    name={'Message'}
                    datos={this.props.state.message}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
                {this.props.state.socialMedialStatus ? (
                  <SocialMedial
                    key={-6}
                    name={'SocialMedial'}
                    datos={this.props.state.socialMedial}
                    pages={this.props.pages}
                  />
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card.Footer>
            <ToastContainer className="p-3" position="bottom-center">
              {this.state.msm ? (
                <Toast bg="success" show={this.state.msmStatus}>
                  <Toast.Body>Operacion Exitosa</Toast.Body>{' '}
                </Toast>
              ) : (
                <Toast bg="warning" show={this.state.msmStatus}>
                  <Toast.Body>Operacion Erronea</Toast.Body>{' '}
                </Toast>
              )}
            </ToastContainer>
          </Card>
          <Modal
            show={this.state.articleShow}
            onHide={this.CreateArticleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="text-center"
          >
            <Modal.Body>
              <CardGroup className="justify-content-evenly text-center">
                <Form.Group className="w-25">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        CAROUSEL / CAROUSEL INFORMATIVO
                      </Tooltip>
                    }
                  >
                    <Form.Label htmlFor="1">
                      <img src={T1} className="w-100" />
                    </Form.Label>
                  </OverlayTrigger>
                  <Form.Check
                    type="radio"
                    id="1"
                    name="themeMessage"
                    aria-label="radio 1"
                    defaultChecked={this.state.type == 1 ? true : false}
                    onClick={this.typeNewArticle}
                  />
                </Form.Group>
                <Form.Group className="w-25">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        CONTENIDO INFORMATIVO
                      </Tooltip>
                    }
                  >
                    <Form.Label htmlFor="2">
                      <img src={T2} className="w-100" />
                    </Form.Label>
                  </OverlayTrigger>
                  <Form.Check
                    type="radio"
                    id="2"
                    name="themeMessage"
                    aria-label="radio 2"
                    defaultChecked={this.state.type == 2 ? true : false}
                    onClick={this.typeNewArticle}
                  />
                </Form.Group>
                <Form.Group className="w-25">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">TABULACIONES</Tooltip>
                    }
                  >
                    <Form.Label htmlFor="3">
                      <img src={T3} className="w-100" />
                    </Form.Label>
                  </OverlayTrigger>

                  <Form.Check
                    type="radio"
                    id="3"
                    name="themeMessage"
                    aria-label="radio 3"
                    defaultChecked={this.state.type == 3 ? true : false}
                    onClick={this.typeNewArticle}
                  />
                </Form.Group>
                <Form.Group className="w-25">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        EVENTOS / NOTICIAS / ACTIVIDADES
                      </Tooltip>
                    }
                  >
                    <Form.Label htmlFor="4">
                      <img src={T4} className="w-100" />
                    </Form.Label>
                  </OverlayTrigger>

                  <Form.Check
                    type="radio"
                    id="4"
                    name="themeMessage"
                    aria-label="radio 4"
                    defaultChecked={this.state.type == 4 ? true : false}
                    onClick={this.typeNewArticle}
                  />
                </Form.Group>
              </CardGroup>
              <Button onClick={this.CreateArticleClose} className="mx-4">
                Cancelar
              </Button>
              <Button
                variant="outline-warning"
                onClick={this.CreateArticle}
                className="mx-4"
              >
                Guardar
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}
