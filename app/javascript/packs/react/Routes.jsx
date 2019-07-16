import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WelcomePage from './pages/Welcome';

export default () => {
  return <Router>
    <Route path="/" exact component={WelcomePage} />
  </Router>
}
