import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import CustomToast from "./CustomToast";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import LineChart from "./LineChart.tsx";

function ProductDashboard() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [addEmailLoading, setAddEmailLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(null);
  const handleEmailInputChange = (e) => setEmail(e.target.value.trim());
  const handleMailModal = (e) => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSaveClick = async () => {
    setAddEmailLoading(true);
    if (email == "" || email == null) {
      setAddEmailLoading(false);
      setShowToast(true);
      setToastText("Enter valid email");
      return;
    }
    const emailObj = {
      email,
      id,
    };
    try {
      const response = await axios.post("/api/products/email/new", emailObj);
      setToastText("Email Added Successfully!");
    } catch (err) {
      setToastText(err.response.data);
    }
    setShowModal(false);
    setEmail(null);
    setAddEmailLoading(false);
    setShowToast(true);
  };
  const getProductDetails = async () => {
    try {
      let productInfo = await axios.get(`/api/products/${id}`);
      setProductDetail(productInfo.data);
      setFetchDataLoading(false);
    } catch (err) {
      console.log(err);
      setToastText(err.response.data);
    }
  };

  useEffect(() => {
    setFetchDataLoading(true);
    getProductDetails();
  }, []);

  return (
    <>
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        text={toastText}
      />
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Track Product</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter your email to track the product. (Mail will be sent when price
          becomes lower.)
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <strong>Email</strong>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailInputChange}
                placeholder="example@gmail.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {addEmailLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <Button
              variant="primary"
              className="linkToProduct"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Navbar expand="sm" className="navbar d-flex">
        <Container fluid>
          <Navbar.Brand className="brand mx-3">
            <Link to="/">Amtrack</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-1 my-md-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {fetchDataLoading ? (
        <Container style={{ textAlign: "center", marginTop: "100px" }}>
          <Spinner animation="border" variant="info" className="mx-auto" />
        </Container>
      ) : (
        <>
          <Container className="mx-md-5 mt-5 mb-5">
            <Row>
              {productDetail.map((_, idx) => (
                <Col md={{ span: 6, offset: 3 }} sm={{ span: 12 }}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={productDetail[idx].image_url}
                      className="cardImage"
                    />
                    <Card.Body>
                      <Card.Title>{productDetail[idx].name}</Card.Title>
                      <br />
                      <Card.Text>
                        <Row className="set-display">
                          <Col sm={{ span: 12 }} md={{ span: 6, offset: 0 }}>
                            <p className="content-head">Date Added</p>{" "}
                            &nbsp;&nbsp;
                            <p>
                              {moment(productDetail[idx].created_at).format(
                                "dddd, MMMM Do YYYY"
                              )}
                            </p>
                          </Col>
                          <Col sm={{ span: 12 }} md={{ span: 6, offset: 0 }}>
                            <p className="content-head">Latest Price</p>
                            &nbsp;&nbsp;
                            <p>{`₹ ${productDetail[idx].prices.at(-1)}`}</p>
                          </Col>
                        </Row>
                        <Row className="set-display">
                          <Col sm={{ span: 12 }} md={{ span: 6, offset: 0 }}>
                            <p className="content-head">Minimum Price</p>
                            &nbsp;&nbsp;
                            <p>{`₹ ${productDetail[idx].minimum_value}`}</p>
                          </Col>
                          <Col sm={{ span: 12 }} md={{ span: 6, offset: 0 }}>
                            <p className="content-head">Rating (Count)</p>
                            &nbsp;&nbsp;
                            <p>
                              {productDetail[idx].rating
                                ? `${productDetail[idx].rating} (${productDetail[idx].rating_count} Reviews)`
                                : "Not Available"}
                            </p>
                          </Col>
                        </Row>
                        <Row className="set-display my-3">
                          <Col
                            md={{ span: 4, offset: 2 }}
                            sm={{ span: 8 }}
                            className="my-2"
                          >
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={productDetail[idx].url}
                            >
                              <Button
                                variant="primary"
                                className="linkToProduct"
                              >
                                View on Amazon
                              </Button>
                            </a>
                          </Col>
                          <Col
                            md={{ span: 4, offset: 0 }}
                            sm={{ span: 8 }}
                            className="my-2"
                          >
                            <Button
                              variant="primary"
                              className="linkToProduct"
                              onClick={handleMailModal}
                            >
                              Track with Mail
                            </Button>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="graphContainer mb-5">
            {!fetchDataLoading && <LineChart productDetail={productDetail} />}
          </Container>
        </>
      )}
    </>
  );
}

export default ProductDashboard;
//TODO: image, Name, created at, latest price, minimum price, rating(rating count), link to product, graph
