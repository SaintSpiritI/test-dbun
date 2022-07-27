import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';

import BodyDashboard from './BDB';

import { URL_ADMIN } from './Const';

class HeadDashboard extends Component {
  constructor(props) {
    super(props);
    this.pgNameRef = React.createRef();
    this.pgNameCreateRef = React.createRef();
  }
  state = {
    pages: this.props.statePage.pages,
    pageName: 'home',
    isSelect: false,
    pagesStatus: false,
    fontStatus: false,
    pagesShow: false,
    fontsShow: false,
    pgSelect: '',
    pgModify: false,
    pgCreate: false,
    pgDelete: false,
    newPage: [],
    font: '',
    marginPage: '0',
    bgPage: '#FFFFFF',
    setting: 1,
    iniPage: false,
    msm: false,
    msmStatus: false,
  };

  async componentDidMount() {
    // ---page--- //
    const reqAdminPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.pageName ? this.state.pageName : 'home',
      }),
    };

    await fetch(URL_ADMIN + 'page.class.php', reqAdminPage)
      .then((response) => response.json())
      .then((data) => this.setState({ setting: data.setting, iniPage: true }))
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });

    // ---setting--- //

    const reqSetting = { 'Content-Type': 'application/json' };

    await fetch(
      URL_ADMIN + 'setting.class.php?id=' + this.state.setting,
      reqSetting
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          font: data.idFont,
          marginPage: data.margin,
          bgPage: data.hexBackground,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  }
  msmClose = () => {
    this.setState({ msmStatus: false });
  };
  CloseSession = () => {
    console.log('sesion cerrada');
  };
  PagesView = () => {
    console.log(this.props.pages);
  };
  PagesShow = () => {
    this.setState({ pagesShow: true });
  };
  PagesClose = () => {
    this.setState({ pagesShow: false });
  };
  FontsView = () => {
    console.log(this.props.fonts);
  };
  FontsShow = () => {
    this.setState({ fontsShow: true });
  };
  FontsClose = () => {
    this.setState({ fontsShow: false });
  };
  FontSelect = (e) => {
    // ---fontPage--- //
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.setting,
        ft: e.target.value ? e.target.value : 1,
      }),
    };

    fetch(URL_ADMIN + 'fontPage.class.php', reqFontPage)
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
  setMarginPage = (e) => {
    this.setState({ marginPage: e.target.value });
    // ---mgPage--- //
    const reqBgPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.setting,
        mg: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'marginPage.class.php', reqBgPage)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ msm: data.msm, msmStatus: true });
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  setBgPage = (e) => {
    this.setState({ bgPage: e.target.value });
    // ---bgPage--- //
    const reqBgPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.setting,
        bg: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'colorPage.class.php', reqBgPage)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ msm: data.msm, msmStatus: true });
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  PageModify = () => {
    if (this.pgNameRef.current.value != '') {
      // ---bgPage--- //
      const reqPgName = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.pgNameRef.current.id,
          pgName: this.pgNameRef.current.value,
        }),
      };

      fetch(URL_ADMIN + 'pageNameModify.class.php', reqPgName)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({ msm: true, msmStatus: true, pages: data.pgs });
          }
          this.setState({ pgModify: false });
          setTimeout(() => {
            this.setState({ msmStatus: false });
          }, 1000);
        })
        .catch((error) => {
          this.setState({ error: true });
          console.log(' error :' + error + ' :');
        });
    } else {
      alert('Datos Vacios');
    }
  };
  PageModifyShow = (e) => {
    this.setState({ pgModify: true });
    this.setState({ pgSelect: e });
  };
  PageModifyClose = () => {
    this.setState({ pgModify: false });
  };
  PageCreate = () => {
    if (this.pgNameCreateRef.current.value != '') {
      // ---createPage--- //
      const reqNewPage = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.pgNameCreateRef.current.value,
          user: sessionStorage.getItem('token'),
        }),
      };

      fetch(URL_ADMIN + 'createPage.class.php', reqNewPage)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pgCreate: false });
          if (data.msm == 'false') {
            this.setState({ msm: false, msmStatus: true });
          } else {
            this.setState({
              msm: true,
              msmStatus: true,
              pages: data.pgs,
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
      alert('Datos vacios');
    }
  };
  PageCreateShow = () => {
    this.setState({ pgCreate: true });
  };
  PageCreateClose = () => {
    this.setState({ pgCreate: false });
  };
  PageDelete = () => {
    this.setState({ pgDelete: false });
    const reqPgDelete = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.pgSelect.id,
      }),
    };

    fetch(URL_ADMIN + 'deletePage.class.php', reqPgDelete)
      .then((response) => response.json())
      .then((data) => {
        if (data.msm == 'false') {
          this.setState({ msm: false, msmStatus: true });
        } else {
          this.setState({ msm: true, msmStatus: true, pages: data.pgs });
        }
        this.setState({ pgDelete: false });
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(' error :' + error + ' :');
      });
  };
  PageDeleteShow = (e) => {
    this.setState({ pgDelete: true, pgSelect: e });
  };
  PageDeleteClose = () => {
    this.setState({ pgDelete: false });
  };
  render() {
    return (
      <div className="navBarContainer vh-100 vw-100">
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="light"
          variant="light"
          className="px-2"
        >
          <Navbar.Brand>Página: </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Button
                variant="outline-secondary"
                onClick={(this.PagesView, this.PagesShow)}
              >
                {this.state.pageName}
              </Button>
              <Button
                variant="outline-info mx-5"
                onClick={(this.FontsView, this.FontsShow)}
              >
                Diseño
              </Button>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={this.props.close}
                className="btn btn-outline-danger mx-2"
              >
                Cerrar Sesion
              </Nav.Link>
              <Nav.Link
                href={this.state.pageName}
                className="btn btn-outline-success"
                target="_black"
              >
                Ver Página
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="bodyContainer position-relative d-flex"
          style={{
            height: 'calc(100vh - 56px)',
            with: 'vw-100',
            position: 'fixed',
            backgroundColor: '#D4E3F0',
          }}
        >
          {!this.state.isSelect ? (
            <BodyDashboard
              page={this.state.pageName}
              pages={this.state.pages}
            />
          ) : (
            <Modal
              show={this.state.isSelect}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body className="text-center">
                <Spinner animation="border" />;
              </Modal.Body>
            </Modal>
          )}
        </div>
        <Offcanvas
          style={{
            marginTop: '56px',
          }}
          show={this.state.pagesShow}
          onHide={this.PagesClose}
          {...{
            name: 'Enable body scrolling',
            scroll: true,
            backdrop: false,
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Informacion General</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card className="text-center">
              <Card.Body>
                <Card.Body>
                  {this.state.pages.map((e, index) => {
                    if (e.id == 1) {
                      return (
                        <div key={index}>
                          <ButtonToolbar
                            aria-label="Toolbar with button groups"
                            className="w-100 my-3"
                          >
                            <ButtonGroup
                              className="w-75"
                              aria-label="First group"
                            >
                              <Button
                                variant="outline-primary"
                                onClick={() => {
                                  this.setState({
                                    pageName: e.name,
                                    pagesShow: false,
                                    isSelect: true,
                                  });
                                  setTimeout(() => {
                                    this.setState({ isSelect: false });
                                  }, 1000);
                                }}
                              >
                                {e.name}
                              </Button>
                            </ButtonGroup>
                          </ButtonToolbar>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <ButtonToolbar
                            aria-label="Toolbar with button groups"
                            className="w-100 my-3"
                          >
                            <ButtonGroup
                              className="w-75"
                              aria-label="First group"
                            >
                              <Button
                                variant="outline-primary"
                                onClick={() => {
                                  this.setState({
                                    pageName: e.name,
                                    pagesShow: false,
                                    isSelect: true,
                                  });
                                  setTimeout(() => {
                                    this.setState({ isSelect: false });
                                  }, 200);
                                }}
                              >
                                {e.name}
                              </Button>
                            </ButtonGroup>
                            <ButtonGroup
                              className="w-25"
                              aria-label="Second group"
                            >
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Modificar Pagina
                                  </Tooltip>
                                }
                              >
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => this.PageModifyShow(e)}
                                >
                                  !
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Eliminar Pagina
                                  </Tooltip>
                                }
                              >
                                <Button
                                  variant="outline-danger"
                                  onClick={() => this.PageDeleteShow(e)}
                                >
                                  X
                                </Button>
                              </OverlayTrigger>
                            </ButtonGroup>
                          </ButtonToolbar>
                        </div>
                      );
                    }
                  })}
                  <div>
                    <ButtonToolbar
                      aria-label="Toolbar with button groups"
                      className="w-100 my-3"
                    >
                      <ButtonGroup className="w-100" aria-label="First group">
                        <Button
                          variant="outline-primary"
                          onClick={this.PageCreateShow}
                        >
                          + Añadir Paginas
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </div>
                </Card.Body>
              </Card.Body>
            </Card>
          </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas
          style={{
            marginTop: '56px',
          }}
          show={this.state.fontsShow}
          onHide={this.FontsClose}
          {...{
            name: 'Enable body scrolling',
            scroll: true,
            backdrop: false,
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Diseño General</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card className="text-center">
              <Card.Body>
                <Card.Subtitle>Margen</Card.Subtitle>
                <Card.Body>
                  <Form>
                    <Form.Group className="d-flex align-items-center">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            Margen de Pagina
                          </Tooltip>
                        }
                      >
                        <Form.Range
                          className="w-75"
                          min="0"
                          max="15"
                          defaultValue={this.state.marginPage}
                          onChange={this.setMarginPage}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            Fondo de Pagina
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          onChange={this.setBgPage}
                          className="w-25 mx-4"
                          type="color"
                          defaultValue={this.state.bgPage}
                        />
                      </OverlayTrigger>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card.Body>
              <Card.Body>
                <Card.Subtitle>Fuentes</Card.Subtitle>
                <Card.Body onChange={this.FontSelect}>
                  {this.props.statePage.fonts.map((e, index) => {
                    return (
                      <div key={index}>
                        <ButtonToolbar
                          aria-label="Toolbar with button groups"
                          className="w-100 my-3"
                        >
                          <ButtonGroup
                            className="w-100"
                            aria-label="First group"
                          >
                            <Form.Check
                              reverse
                              label={e.font}
                              defaultChecked={
                                this.state.font == e.id ? true : false
                              }
                              type="radio"
                              name="group"
                              style={{ fontFamily: e.font }}
                              value={e.id}
                              id={e.id}
                            />
                          </ButtonGroup>
                        </ButtonToolbar>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card.Body>
            </Card>
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer className="p-3" bg="success" position="middle-end">
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
        <Modal
          show={this.state.pgModify}
          onHide={this.PageModifyClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Renombrar Pagina"
                id={this.state.pgSelect.id}
                defaultValue={this.state.pgSelect.name}
                ref={this.pgNameRef}
              />
            </Form.Group>
            <Button onClick={this.PageModifyClose} className="mx-4">
              Cancelar
            </Button>
            <Button
              variant="outline-warning"
              onClick={this.PageModify}
              className="mx-4"
            >
              Guardar
            </Button>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.pgCreate}
          onHide={this.PageCreateClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre de la Pagina"
                ref={this.pgNameCreateRef}
                required
              />
            </Form.Group>
            <Button onClick={this.PageCreateClose} className="mx-4">
              Cancelar
            </Button>
            <Button
              variant="outline-warning"
              onClick={this.PageCreate}
              className="mx-4"
            >
              Guardar
            </Button>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.pgDelete}
          onHide={this.PageDeleteClose}
          backdrop="static"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Title>¿Esta seguro que desea eliminar?</Modal.Title>
          <Modal.Body>
            <Form.Group className="mb-3">
              Se eliminara todo el contenido de esta pagina
            </Form.Group>
            <Button onClick={this.PageDeleteClose} className="mx-4">
              Cancelar
            </Button>
            <Button
              variant="outline-danger"
              onClick={this.PageDelete}
              className="mx-4"
            >
              Confirmar
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default HeadDashboard;
