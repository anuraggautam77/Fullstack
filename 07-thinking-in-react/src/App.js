import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Application from "./containers"
import Board from './containers/board';
import Slack from "./containers/slack";
import BoardDetail from "./containers/boarddetail"
import './App.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Application} />
          <Route exact path="/trello" component={Board} />
          <Route path="/trello/detail" component={BoardDetail} />
          <Route exact path="/slack" component={Slack} />
        </div>
      </Router>
    );
  }
}

export default App;
