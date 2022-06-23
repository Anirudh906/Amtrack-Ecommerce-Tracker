import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CustomToast from "./CustomToast";
import axios from "axios";
import ProductCard from "./ProductCard";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(null);
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => setSearchText(e.target.value.trim());

  const handleSearch = () => {
    if (searchText != "") {
      let products = [...productList];
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(products);
      console.log(products);
    } else {
      setFilteredList([]);
    }
  };
  const fetchAllData = async () => {
    let allData = await axios.get("/api/products");
    setProductList(allData.data);
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      setShowToast(true);
      setToastText("Product removed successfully");
      setProductList(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add Product
    </Tooltip>
  );
  const handleSaveClick = async (e) => {
    e.preventDefault();
    setAddProductLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (url == "" || url == null) {
      setAddProductLoading(false);
      setShowToast(true);
      setToastText("Enter valid URL");
      return;
    }
    const formData = {
      url,
    };
    try {
      const allData = await axios.post("/api/products", formData);
      setShowToast(true);
      setToastText("check");
      if (allData) {
        setProductList(allData.data);
        setAddProductLoading(false);
        setShowToast(true);
        setToastText("Product added successfully");
        setShowModal(false);
      }
    } catch (err) {
      console.log(err.response.data);
      setShowToast(true);
      setToastText(err.response.data);
      setShowModal(false);
      setAddProductLoading(false);
      setUrl("");
    }
  };
  const handleUrlInputChange = (e) => {
    setUrl(e.target.value.trim());
  };
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
          Enter product URL from Amazon India website to track its price.
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <strong>Amazon URL</strong>
              </Form.Label>
              <Form.Control
                type="email"
                value={url}
                onChange={handleUrlInputChange}
                placeholder="https://amazon.in/...../"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {addProductLoading ? (
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchText}
                onChange={handleSearchText}
              />
              <Button onClick={handleSearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="dashboard">
        <h2>🛍 &nbsp; My Products &nbsp;&nbsp;</h2>
        <Container className="list">
          <Row xs={1} md={2} lg={3} sm={1} className="g-4">
            {filteredList.length == 0
              ? productList.map((_, idx) => (
                  <ProductCard
                    productList={productList[idx]}
                    deleteProduct={deleteProduct}
                  />
                ))
              : filteredList.map((_, idx) => (
                  <ProductCard
                    productList={filteredList[idx]}
                    deleteProduct={deleteProduct}
                  />
                ))}
          </Row>
        </Container>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button className="addButton" onClick={handleShow}>
            +
          </Button>
        </OverlayTrigger>
      </Container>
    </>
  );
}

export default Dashboard;
