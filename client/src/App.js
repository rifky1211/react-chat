import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./assets/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontawesome/css/all.min.css";

import Chat from "./views/Chat";
import RegisterPage from './views/RegisterPage'


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={RegisterPage}></Route>
        <Route path="/chat" component={Chat}></Route>
      </div>
    </Router>
  );
}

export default App;
