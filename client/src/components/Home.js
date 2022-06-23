import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Dashboard from './Dashboard';

function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default Home;
