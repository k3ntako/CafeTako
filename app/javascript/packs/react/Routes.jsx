import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/Welcome';
import AddLocationPage from './pages/AddLocation';

export default () => {
  return <Router>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/locations/new" exact component={AddLocationPage} />
  </Router>
}
