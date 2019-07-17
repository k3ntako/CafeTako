import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/Welcome';
import AddLocationPage from './pages/AddLocation';
import LocationPage from './pages/Location';

export default () => {
  return <Router>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/locations/new" exact component={AddLocationPage} />
    <Route path="/locations/:id" component={LocationPage} />
  </Router>
}
