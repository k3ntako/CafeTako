import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Nav from './components/Nav';

import WelcomePage from './pages/Welcome';
import AddLocationPage from './pages/AddLocation';
import LocationPage from './pages/Location';
import AddReviewPage from './pages/AddReview';

export default () => {
  return <Router>
    <Nav />
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      <Route path="/locations/new" exact component={AddLocationPage} />
      <Route path="/chains/:chainId/locations/:id" exact component={LocationPage} />
      <Route path="/chains/:chainId/locations/:id/review" exact component={AddReviewPage} />
    </Switch>
  </Router>
}
