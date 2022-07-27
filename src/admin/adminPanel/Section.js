import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

import { URL_ADMIN } from '../Const';

export default class Section extends Component {
  state = {
    show: false,
    validated: false,
    msm: false,
    msmStatus: false,
    imageSection: this.props.datos.imageAddress,
    hexBackground: this.props.datos.hexBackground,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  sectionImage = (e) => {
    const data = new FormData();
    data.append('section', e.target.files[0]);
    data.append('id', this.props.datos.id);
    axios
      .post(URL_ADMIN + 'sectionImage.class.php', data)
      .then((data) => {
        if (data.data.file == 'false') {
          this.setState({ msm: false, msmStatus: true });
        }
        if (data.data.file == 'true') {
          this.setState({
            msm: true,
            msmStatus: true,
            imageSection: URL.createObjectURL(e.target.files[0]),
          });
        }
        setTimeout(() => {
          this.setState({ msmStatus: false });
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  dteSection = () => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
      }),
    };

    fetch(URL_ADMIN + 'deleteSection.class.php', reqFontPage)
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
  nroSection = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        orderNumber: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'OrderSection.class.php', reqFontPage)
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
  bgSection = (e) => {
    const reqFontPage = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.datos.id,
        hexBackground: e.target.value,
      }),
    };

    fetch(URL_ADMIN + 'sectionColor.class.php', reqFontPage)
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
  SectionSlideSubmit = (e) => {
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
        }),
      };
      fetch(URL_ADMIN + 'SectionSlideSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionSlideCardSubmit = (e) => {
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
          extra: e.target['3'].value,
          text: e.target['4'].value,
          url: e.target['5'].value,
          location: e.target['6'].value,
        }),
      };
      fetch(URL_ADMIN + 'SectionSlideCardSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionButtonSubmit = (e) => {
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
          text: e.target['0'].value,
          url: e.target['1'].value,
        }),
      };
      fetch(URL_ADMIN + 'SectionButtonSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionInfoSubmit = (e) => {
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
      fetch(URL_ADMIN + 'SectionInfoSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionTabCardSubmit = (e) => {
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
          extra: e.target['3'].value,
          text: e.target['4'].value,
          url: e.target['5'].value,
        }),
      };
      fetch(URL_ADMIN + 'SectionTabCardSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionTabSubmit = (e) => {
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
      fetch(URL_ADMIN + 'SectionTabSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  SectionCardSubmit = (e) => {
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
          extra: e.target['3'].value,
          text: e.target['4'].value,
          url: e.target['5'].value,
        }),
      };
      fetch(URL_ADMIN + 'SectionCardSubmit.class.php', reqMessage)
        .then((response) => response.json())
        .then((data) => {
          if (data.msm == 'false') {
            this.setState({
              msm: false,
              msmStatus: true,
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
  render() {
    let section;
    if (this.props.type <= 1) {
      if (this.props.theme <= 1) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.sectionImage}
                />
                <img
                  src={this.state.imageSection}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionSlideSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="title" className="my-3">
                    TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    defaultValue={this.props.datos.title}
                  />
                  <Form.Label htmlFor="subTitle" className="my-3">
                    SUB TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="subTitle"
                    defaultValue={this.props.datos.subTitle}
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
      if (this.props.theme >= 2) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.sectionImage}
                />
                <img
                  src={this.state.imageSection}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionSlideCardSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="title" className="my-3">
                    TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    defaultValue={this.props.datos.title}
                  />
                  <Form.Label htmlFor="subTitle" className="my-3">
                    SUB TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="subTitle"
                    defaultValue={this.props.datos.subTitle}
                  />
                  <Form.Label htmlFor="content" className="my-3">
                    CONTENIDO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="content"
                    className="lineBreak"
                    defaultValue={this.props.datos.content}
                    as="textarea"
                  />
                  <Form.Label htmlFor="extra" className="my-3">
                    CONTENIDO EXTRA
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="extra"
                    className="lineBreak"
                    defaultValue={this.props.datos.extra}
                    as="textarea"
                  />
                  <Form.Label htmlFor="button" className="my-3">
                    NOMBRE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="button"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonText}
                  />
                  <Form.Label htmlFor="url" className="my-3">
                    URL/LINK
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="url"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonUrl}
                  />
                  <Form.Label htmlFor="location" className="my-3">
                    LUGAR
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="location"
                    className="lineBreak"
                    defaultValue={this.props.datos.location}
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
    }
    if (this.props.type == 2) {
      if (this.props.theme <= 2) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionButtonSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="button" className="my-3">
                    NOMBRE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="button"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonText}
                  />
                  <Form.Label htmlFor="url" className="my-3">
                    URL/LINK
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="url"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonUrl}
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
      if (this.props.theme >= 3) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.sectionImage}
                />
                <img
                  src={this.state.imageSection}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionInfoSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="title" className="my-3">
                    TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    defaultValue={this.props.datos.title}
                  />
                  <Form.Label htmlFor="subTitle" className="my-3">
                    SUB TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="subTitle"
                    defaultValue={this.props.datos.subTitle}
                  />
                  <Form.Label htmlFor="content" className="my-3">
                    CONTENIDO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="content"
                    className="lineBreak"
                    defaultValue={this.props.datos.content}
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
    }
    if (this.props.type == 3) {
      if (this.props.theme <= 1) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.sectionImage}
                />
                <img
                  src={this.state.imageSection}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionTabCardSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="title" className="my-3">
                    TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    defaultValue={this.props.datos.title}
                  />
                  <Form.Label htmlFor="subTitle" className="my-3">
                    SUB TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="subTitle"
                    defaultValue={this.props.datos.subTitle}
                  />
                  <Form.Label htmlFor="content" className="my-3">
                    CONTENIDO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="content"
                    className="lineBreak"
                    defaultValue={this.props.datos.content}
                    as="textarea"
                  />
                  <Form.Label htmlFor="extra" className="my-3">
                    CONTENIDO EXTRA
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="extra"
                    className="lineBreak"
                    defaultValue={this.props.datos.extra}
                    as="textarea"
                  />
                  <Form.Label htmlFor="button" className="my-3">
                    NOMBRE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="button"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonText}
                  />
                  <Form.Label htmlFor="url" className="my-3">
                    URL/LINK
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="url"
                    className="lineBreak"
                    defaultValue={this.props.datos.buttonUrl}
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
      if (this.props.theme >= 2) {
        section = (
          <Card>
            <Card.Body className="text-start">
              <Card.Body>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/webp,image/png,image/svg+xml"
                  onChange={this.sectionImage}
                />
                <img
                  src={this.state.imageSection}
                  className="w-100 my-2"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </Card.Body>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.SectionTabSubmit}
                className="w-100 text-center"
              >
                <Card.Body className="text-start">
                  <Form.Label htmlFor="title" className="my-3">
                    TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    defaultValue={this.props.datos.title}
                  />
                  <Form.Label htmlFor="subTitle" className="my-3">
                    SUB TÍTULO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="subTitle"
                    defaultValue={this.props.datos.subTitle}
                  />
                  <Form.Label htmlFor="content" className="my-3">
                    CONTENIDO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="content"
                    className="lineBreak"
                    defaultValue={this.props.datos.content}
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
    }
    if (this.props.type >= 4) {
      section = (
        <Card>
          <Card.Body className="text-start">
            <Card.Body>
              <Form.Control
                type="file"
                name="image"
                accept="image/webp,image/png,image/svg+xml"
                onChange={this.sectionImage}
              />
              <img
                src={this.state.imageSection}
                className="w-100 my-2"
                style={{ maxHeight: '150px', objectFit: 'contain' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            </Card.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.SectionCardSubmit}
              className="w-100 text-center"
            >
              <Card.Body className="text-start">
                <Form.Label htmlFor="title" className="my-3">
                  TÍTULO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  defaultValue={this.props.datos.title}
                />
                <Form.Label htmlFor="subTitle" className="my-3">
                  SUB TÍTULO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="subTitle"
                  defaultValue={this.props.datos.subTitle}
                />
                <Form.Label htmlFor="content" className="my-3">
                  CONTENIDO
                </Form.Label>
                <Form.Control
                  type="text"
                  id="content"
                  className="lineBreak"
                  defaultValue={this.props.datos.content}
                  as="textarea"
                />
                <Form.Label htmlFor="extra" className="my-3">
                  CONTENIDO EXTRA
                </Form.Label>
                <Form.Control
                  type="text"
                  id="extra"
                  className="lineBreak"
                  defaultValue={this.props.datos.extra}
                  as="textarea"
                />
                <Form.Label htmlFor="button" className="my-3">
                  NOMBRE
                </Form.Label>
                <Form.Control
                  type="text"
                  id="button"
                  className="lineBreak"
                  defaultValue={this.props.datos.buttonText}
                />
                <Form.Label htmlFor="url" className="my-3">
                  URL/LINK
                </Form.Label>
                <Form.Control
                  type="text"
                  id="url"
                  className="lineBreak"
                  defaultValue={this.props.datos.buttonUrl}
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
    return (
      <div className="w-100 d-flex">
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="w-100 my-3"
        >
          <ButtonGroup className="w-75" aria-label="First group">
            <Button variant="outline-primary" onClick={this.handleShow}>
              {this.props.datos.title}
            </Button>
          </ButtonGroup>
          <ButtonGroup className="w-25" aria-label="First group">
            <Form.Control
              className="text-center"
              placeholder="#"
              defaultValue={this.props.datos.orderNumber}
              onChange={this.nroSection}
              type="number"
              min="0"
            />
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
            <Offcanvas.Title>Sección</Offcanvas.Title>
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
                    onChange={this.bgSection}
                    className="w-25 mx-auto my-2"
                    type="color"
                    defaultValue={this.state.hexBackground}
                  />
                </OverlayTrigger>
              </Card.Body>
            </Card>
            {section}
            <Button
              variant="outline-danger"
              className="w-50 my-4 "
              onClick={this.dteSection}
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
