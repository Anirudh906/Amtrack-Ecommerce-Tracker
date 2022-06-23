import React, {Fragment} from 'react';
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import ProductDashboard from './components/ProductDashboard';

function App() {
  return (
  <Fragment>
    <Router>
        <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={ProductDashboard} />
            </Switch>
        </Fragment>
      </Router>  
  </Fragment>
  );
}

export default App;
