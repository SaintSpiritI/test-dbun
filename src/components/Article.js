import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';

class Article extends Component {
  render() {
    return this.props.articles.map((e, index) => {
      if (e.condition == 1) {
        if (e.type <= 1) {
          if (e.theme <= 1) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                /* article type Slide */
                <div
                  className="articleSlide"
                  style={{ width: '100%' }}
                  key={index}
                >
                  <Carousel
                    style={{ backgroundColor: e.hexBackground, height: '50vh' }}
                    variant="dark"
                  ></Carousel>
                </div>
              );
            } else {
              return (
                /* article type Slide */
                <div
                  className="articleSlide"
                  style={{ width: '100%' }}
                  key={index}
                >
                  <Carousel
                    style={{
                      backgroundColor: e.hexBackground,
                      maxHeight: '550px',
                    }}
                    variant="dark"
                  >
                    {e.sections.map((e, index) => {
                      if (e.condition == 1) {
                        return (
                          <Carousel.Item className="text-center" key={index}>
                            <img
                              className="img-fluid w-100"
                              src={e.imageAddress}
                              alt="First slide"
                              style={{
                                maxHeight: '550px',
                                objectFit: 'cover',
                              }}
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <Carousel.Caption>
                              <h3>{e.title}</h3>
                              <p>{e.subTitle}</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        );
                      }
                    })}
                  </Carousel>
                </div>
              );
            }
          }
          if (e.theme >= 2) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                <Carousel
                  variant="dark"
                  key={index}
                  style={{ height: '50vh' }}
                ></Carousel>
              );
            } else {
              return (
                <Carousel variant="dark" key={index}>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Carousel.Item key={index}>
                          <Card
                            border="Primary"
                            className="mx-auto text-center"
                            style={{
                              backgroundColor: e.hexBackground,
                              maxWidth: '1400px',
                              maxHeight: '650px',
                            }}
                          >
                            <Card.Body>
                              <Card.Img
                                variant="top"
                                style={{
                                  maxHeight: '250px',
                                  objectFit: 'contain',
                                }}
                                src={e.imageAddress}
                                onError={(e) =>
                                  (e.target.style.display = 'none')
                                }
                              />
                              <Card.Title>{e.title}</Card.Title>
                              <Card.Title>{e.subTitle}</Card.Title>
                              <Card.Text className="lineBreak">
                                {e.content}
                              </Card.Text>
                              <Card.Text className="lineBreak">
                                {e.extra}
                              </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem
                                style={{ backgroundColor: e.hexBackground }}
                              >
                                <Card.Link
                                  href={e.buttonUrl}
                                  className="btn btn-primary mx-auto"
                                >
                                  {e.buttonText}
                                </Card.Link>
                              </ListGroupItem>
                              <ListGroupItem
                                style={{ backgroundColor: e.hexBackground }}
                              >
                                {e.location}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Footer>{e.dateTime}</Card.Footer>
                          </Card>
                        </Carousel.Item>
                      );
                    }
                  })}
                </Carousel>
              );
            }
          }
        }
        if (e.type == 2) {
          if (e.theme <= 1) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                /* article type Cards Information */
                <Card
                  className="text-center"
                  style={{ backgroundColor: e.hexBackground }}
                  key={index}
                >
                  <Card.Header>
                    <Card.Title className="py-4">{e.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Subtitle className="py-3">{e.subTitle}</Card.Subtitle>
                    <Card.Text className="py-2 lineBreak">
                      {e.content}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              );
            } else {
              return (
                /* article type Cards Information */
                <Card className="text-center" key={index}>
                  <Card.Body>
                    <Card
                      className="text-center mx-auto"
                      style={{
                        backgroundColor: e.hexBackground,
                        maxWidth: '1200px',
                      }}
                    >
                      <Card.Header>
                        <Card.Title className="py-4">{e.title}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Subtitle className="py-3">
                          {e.subTitle}
                        </Card.Subtitle>
                        <Card.Text className="py-2 lineBreak">
                          {e.content}
                        </Card.Text>
                        {e.sections.map((e, index) => {
                          if (e.condition == 1) {
                            return (
                              <Card.Link
                                href={e.buttonUrl}
                                className="btn btn-primary m-1"
                                key={index}
                              >
                                {e.buttonText}
                              </Card.Link>
                            );
                          }
                        })}
                      </Card.Body>
                      <Card.Footer></Card.Footer>
                    </Card>
                  </Card.Body>
                </Card>
              );
            }
          }
          if (e.theme == 2) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                /* article type Cards Information */
                <CardGroup
                  className="p-4"
                  style={{ backgroundColor: e.hexBackground }}
                  key={index}
                >
                  <Card
                    style={{ backgroundColor: '#FFFFFFAA', maxWidth: '500px' }}
                  >
                    <Card.Img
                      variant="top"
                      className="m-auto"
                      src={e.imageAddress}
                      style={{
                        maxHeight: '350px',
                        objectFit: 'contain',
                      }}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </Card>
                  <Card style={{ backgroundColor: '#FFFFFFAA' }}>
                    <Card.Header>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center"></Card.Footer>
                  </Card>
                </CardGroup>
              );
            } else {
              return (
                /* article type Cards Information */
                <CardGroup
                  className="p-4"
                  style={{ backgroundColor: e.hexBackground }}
                  key={index}
                >
                  <Card
                    style={{ backgroundColor: '#FFFFFFAA', maxWidth: '500px' }}
                  >
                    <Card.Img
                      variant="top"
                      className="m-auto"
                      style={{
                        maxHeight: '350px',
                        objectFit: 'contain',
                      }}
                      src={e.imageAddress}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </Card>
                  <Card style={{ backgroundColor: '#FFFFFFAA' }}>
                    <Card.Header>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">
                      {e.sections.map((e, index) => {
                        if (e.condition == 1) {
                          return (
                            <Card.Link
                              href={e.buttonUrl}
                              className="btn btn-primary m-1"
                              key={index}
                            >
                              {e.buttonText}
                            </Card.Link>
                          );
                        }
                      })}
                    </Card.Footer>
                  </Card>
                </CardGroup>
              );
            }
          }
          if (e.theme == 3) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                /* article type Cards Information */
                <div xs={1} md={1} className="g-4" key={index}>
                  <Card
                    border="light"
                    className="text-center"
                    style={{ backgroundColor: e.hexBackground }}
                  >
                    <Card.Body>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            } else {
              return (
                /* article type Cards Information */
                <div xs={1} md={1} className="g-4" key={index}>
                  <Card
                    border="light"
                    className="text-center"
                    style={{ backgroundColor: e.hexBackground }}
                  >
                    <Card.Body>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <CardGroup
                            className="px-4 py-2"
                            style={{ backgroundColor: e.hexBackground }}
                          >
                            <Col sm={4}>
                              <Card>
                                <Card.Img
                                  variant="top"
                                  src={e.imageAddress}
                                  className="h-100 m-auto"
                                  style={{
                                    maxHeight: '250px',
                                    objectFit: 'contain',
                                  }}
                                  onError={(e) =>
                                    (e.target.style.display = 'none')
                                  }
                                />
                              </Card>
                            </Col>
                            <Col sm={8}>
                              <Card
                                style={{ backgroundColor: '#FFFFFFAA' }}
                                className="h-100"
                              >
                                <Card.Body>
                                  <Card.Title className="px-5 py-2">
                                    {e.title}
                                  </Card.Title>
                                  <Card.Subtitle className="px-5 py-2">
                                    {e.subTitle}
                                  </Card.Subtitle>
                                  <Card.Text className="px-5 py-1 lineBreak">
                                    {e.content}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          </CardGroup>
                        </Col>
                      );
                    }
                  })}
                </div>
              );
            }
          }
          if (e.theme >= 4) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                /* article type Cards Information */
                <div xs={1} md={1} className="g-4" key={index}>
                  <Card
                    border="light"
                    className="text-center"
                    style={{ backgroundColor: e.hexBackground }}
                  >
                    <Card.Body>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            } else {
              return (
                /* article type Cards Information */
                <div xs={1} md={1} className="g-4" key={index}>
                  <Card
                    border="light"
                    className="text-center"
                    style={{ backgroundColor: e.hexBackground }}
                  >
                    <Card.Body>
                      <Card.Title className="py-4">{e.title}</Card.Title>
                      <Card.Subtitle className="py-3">
                        {e.subTitle}
                      </Card.Subtitle>
                      <Card.Text className="py-2 lineBreak">
                        {e.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <CardGroup
                            className="px-4 py-2"
                            style={{ backgroundColor: e.hexBackground }}
                          >
                            <Col sm={8}>
                              <Card
                                style={{ backgroundColor: '#FFFFFFAA' }}
                                className="h-100"
                              >
                                <Card.Body>
                                  <Card.Title className="px-5 py-2">
                                    {e.title}
                                  </Card.Title>
                                  <Card.Subtitle className="px-5 py-2">
                                    {e.subTitle}
                                  </Card.Subtitle>
                                  <Card.Text className="px-5 py-1 lineBreak">
                                    {e.content}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col sm={4}>
                              <Card>
                                <Card.Img
                                  variant="top"
                                  src={e.imageAddress}
                                  className="h-100 m-auto"
                                  style={{
                                    maxHeight: '250px',
                                    objectFit: 'contain',
                                  }}
                                  onError={(e) =>
                                    (e.target.style.display = 'none')
                                  }
                                />
                              </Card>
                            </Col>
                          </CardGroup>
                        </Col>
                      );
                    }
                  })}
                </div>
              );
            }
          }
        }
        if (e.type == 3) {
          if (e.theme <= 1) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                ></Tabs>
              );
            } else {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                >
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Tab eventKey={e.title} title={e.title} key={index}>
                          <Card border="light">
                            <Col sm={6} className="mx-auto">
                              <Card border="dark">
                                <Card.Body>
                                  <Card.Img
                                    variant="top"
                                    src={e.imageAddress}
                                    style={{
                                      maxHeight: '250px',
                                      objectFit: 'contain',
                                    }}
                                    onError={(e) =>
                                      (e.target.style.display = 'none')
                                    }
                                  />
                                </Card.Body>
                                <Card.Body>
                                  <Card.Header>
                                    <Card.Title className="text-center">
                                      {e.title}
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Subtitle className="my-3">
                                    {e.subTitle}
                                  </Card.Subtitle>
                                  <ListGroupItem>
                                    <Card.Text className="lineBreak">
                                      {e.content}
                                    </Card.Text>
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <Card.Text className="lineBreak">
                                      {e.extra}
                                    </Card.Text>
                                  </ListGroupItem>
                                  <ListGroupItem className="text-center">
                                    <Card.Link
                                      href={e.buttonUrl}
                                      className="btn btn-primary my-2"
                                    >
                                      {e.buttonText}
                                    </Card.Link>
                                  </ListGroupItem>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Card>
                        </Tab>
                      );
                    }
                  })}
                </Tabs>
              );
            }
          }
          if (e.theme == 2) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                ></Tabs>
              );
            } else {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                >
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Tab eventKey={e.title} title={e.title} key={index}>
                          <Col>
                            <CardGroup
                              className="px-4"
                              style={{ backgroundColor: e.hexBackground }}
                            >
                              <Col sm={4}>
                                <Card>
                                  <Card.Img
                                    variant="top"
                                    src={e.imageAddress}
                                    className="h-100"
                                    style={{
                                      maxHeight: '350px',
                                      objectFit: 'contain',
                                    }}
                                    onError={(e) =>
                                      (e.target.style.display = 'none')
                                    }
                                  />
                                </Card>
                              </Col>
                              <Col sm={8}>
                                <Card
                                  style={{ backgroundColor: '#FFFFFFAA' }}
                                  className="h-100"
                                >
                                  <Card.Body>
                                    <Card.Title className="px-5 py-4">
                                      {e.title}
                                    </Card.Title>
                                    <Card.Subtitle className="px-5 py-3">
                                      {e.subTitle}
                                    </Card.Subtitle>
                                    <Card.Text className="px-5 py-2 lineBreak">
                                      {e.content}
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </Col>
                            </CardGroup>
                          </Col>
                        </Tab>
                      );
                    }
                  })}
                </Tabs>
              );
            }
          }
          if (e.theme >= 3) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                ></Tabs>
              );
            } else {
              return (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="my-5"
                  key={index}
                >
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Tab eventKey={e.title} title={e.title} key={index}>
                          <Col>
                            <CardGroup
                              className="px-4"
                              style={{ backgroundColor: e.hexBackground }}
                            >
                              <Col sm={8}>
                                <Card
                                  style={{ backgroundColor: '#FFFFFFAA' }}
                                  className="h-100"
                                >
                                  <Card.Body>
                                    <Card.Title className="px-5 py-4">
                                      {e.title}
                                    </Card.Title>
                                    <Card.Subtitle className="px-5 py-3">
                                      {e.subTitle}
                                    </Card.Subtitle>
                                    <Card.Text className="px-5 py-2 lineBreak">
                                      {e.content}
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col sm={4}>
                                <Card>
                                  <Card.Img
                                    variant="top"
                                    src={e.imageAddress}
                                    className="h-100"
                                    style={{
                                      maxHeight: '350px',
                                      objectFit: 'contain',
                                    }}
                                    onError={(e) =>
                                      (e.target.style.display = 'none')
                                    }
                                  />
                                </Card>
                              </Col>
                            </CardGroup>
                          </Col>
                        </Tab>
                      );
                    }
                  })}
                </Tabs>
              );
            }
          }
        }
        if (e.type >= 4) {
          if (e.theme <= 1) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return <div xs={1} md={3} className="g-4 p-4" key={index}></div>;
            } else {
              return (
                <Row xs={1} md={3} className="g-4 p-4" key={index}>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <Card>
                            <Card.Header>
                              <Card.Title>{e.title}</Card.Title>
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              src={e.imageAddress}
                              style={{
                                maxHeight: '350px',
                                objectFit: 'contain',
                              }}
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <Card.Body>
                              <Card.Header>
                                <Card.Subtitle>{e.subTitle}</Card.Subtitle>
                              </Card.Header>
                              <Card.Text className="lineBreak">
                                {e.content}
                              </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                              <ListGroupItem className="lineBreak">
                                {e.extra}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link
                                href={e.buttonUrl}
                                className="btn btn-primary m-1"
                              >
                                {e.buttonText}
                              </Card.Link>
                            </Card.Body>
                            <Card.Footer>
                              <small className="text-muted">{e.dateTime}</small>
                            </Card.Footer>
                          </Card>
                        </Col>
                      );
                    }
                  })}
                </Row>
              );
            }
          }
          if (e.theme == 2) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return <div xs={1} md={4} className="g-4 p-4" key={index}></div>;
            } else {
              return (
                <Row xs={1} md={4} className="g-4 p-4" key={index}>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <Card>
                            <Card.Header>
                              <Card.Title>{e.title}</Card.Title>
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              src={e.imageAddress}
                              style={{
                                maxHeight: '300px',
                                objectFit: 'contain',
                              }}
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <Card.Body>
                              <Card.Header>
                                <Card.Subtitle>{e.subTitle}</Card.Subtitle>
                              </Card.Header>
                              <Card.Text className="lineBreak">
                                {e.content}
                              </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                              <ListGroupItem className="lineBreak">
                                {e.extra}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link
                                href={e.buttonUrl}
                                className="btn btn-primary m-1"
                              >
                                {e.buttonText}
                              </Card.Link>
                            </Card.Body>
                            <Card.Footer>
                              <small className="text-muted">{e.dateTime}</small>
                            </Card.Footer>
                          </Card>
                        </Col>
                      );
                    }
                  })}
                </Row>
              );
            }
          }
          if (e.theme == 3) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return <div xs={1} md={5} className="g-4 p-4" key={index}></div>;
            } else {
              return (
                <Row xs={1} md={5} className="g-4 p-4" key={index}>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <Card>
                            <Card.Header>
                              <Card.Title>{e.title}</Card.Title>
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              src={e.imageAddress}
                              style={{
                                maxHeight: '250px',
                                objectFit: 'contain',
                              }}
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <Card.Body>
                              <Card.Header>
                                <Card.Subtitle>{e.subTitle}</Card.Subtitle>
                              </Card.Header>
                              <Card.Text className="lineBreak">
                                {e.content}
                              </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                              <ListGroupItem className="lineBreak">
                                {e.extra}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link
                                href={e.buttonUrl}
                                className="btn btn-primary m-1"
                              >
                                {e.buttonText}
                              </Card.Link>
                            </Card.Body>
                            <Card.Footer>
                              <small className="text-muted">{e.dateTime}</small>
                            </Card.Footer>
                          </Card>
                        </Col>
                      );
                    }
                  })}
                </Row>
              );
            }
          }
          if (e.theme >= 4) {
            /* Comprobacion de las secciones del articulo si es vacio */
            if (!e.sections.length) {
              return <div xs={1} md={6} className="g-4 p-4" key={index}></div>;
            } else {
              return (
                <Row xs={1} md={6} className="g-4 p-4" key={index}>
                  {e.sections.map((e, index) => {
                    if (e.condition == 1) {
                      return (
                        <Col key={index}>
                          <Card>
                            <Card.Header>
                              <Card.Title>{e.title}</Card.Title>
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              src={e.imageAddress}
                              style={{
                                maxHeight: '200px',
                                objectFit: 'contain',
                              }}
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <Card.Body>
                              <Card.Header>
                                <Card.Subtitle>{e.subTitle}</Card.Subtitle>
                              </Card.Header>
                              <Card.Text className="lineBreak">
                                {e.content}
                              </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                              <ListGroupItem className="lineBreak">
                                {e.extra}
                              </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link
                                href={e.buttonUrl}
                                className="btn btn-primary m-1"
                              >
                                {e.buttonText}
                              </Card.Link>
                            </Card.Body>
                            <Card.Footer>
                              <small className="text-muted">{e.dateTime}</small>
                            </Card.Footer>
                          </Card>
                        </Col>
                      );
                    }
                  })}
                </Row>
              );
            }
          }
        }
      }
    });
  }
}
export default Article;
