import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Application from './containers/index';
import Home from './containers/home';
import Slack from './containers/slack';
import BoardDetail from './containers/boarddetail';
import Notes from './containers/notes';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Application} />
					<Route exact path="/trello" component={Home} />
					<Route path="/trello/detail/:id" component={BoardDetail} />
					<Route exact path="/slack" component={Slack} />
					<Route exact path="/note" component={Notes} />
				</div>
			</Router>
		);
	}
}

export default App;
