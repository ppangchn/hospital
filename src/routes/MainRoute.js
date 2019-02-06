import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OperationalDashboard from '../views/operational-dashboard';
import TacticDashboard from '../views/tactic-dashboard';

class MainRoute extends Component {
	render() {
		return (
				<Switch>
					<Route exact path="/" component={OperationalDashboard} />
					<Route path="/history" component={TacticDashboard} />
				</Switch>
		);
	}
}

export default MainRoute;
