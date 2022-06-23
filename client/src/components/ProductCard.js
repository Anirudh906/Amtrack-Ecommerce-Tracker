import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import { Link } from "react-router-dom";

function ProductCard({ productList, deleteProduct }) {
  return (
    <>
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={productList.image_url}
            className="cardImage"
          />
          <Card.Body className="card-height">
            <Row className="card-title-height">
              <Col>
                <Card.Title>{productList.name}</Card.Title>
              </Col>
            </Row>
            <Card.Text>
              <Row>
                <Col>
                  <p className="mb-0 mt-3">
                    <span className="content-head">Latest Price</span>: ₹
                    {productList.prices.at(-1)} &nbsp;
                    {productList.prices.at(-1) == productList.minimum_value && (
                      <Badge bg="success">MIN</Badge>
                    )}
                  </p>
                  <p>
                    <span className="content-head">Created at</span> :{" "}
                    {moment(productList.created_at).format(
                      "dddd, MMMM Do YYYY"
                    )}
                  </p>
                </Col>
              </Row>
            </Card.Text>
            <Row>
              <Col>
                <Link to={`/product/${productList._id}`}>
                  <Button variant="primary" className="linkToProduct">
                    Learn More
                  </Button>
                </Link>
              </Col>
              <Col>
                <button
                  className="delete-button pull-right mx-4 pt-2"
                  onClick={() => deleteProduct(productList._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default ProductCard;
