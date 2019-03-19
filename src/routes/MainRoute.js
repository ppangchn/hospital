import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OperationalDashboard from '../views/operational-dashboard';
import Historical from '../views/tactic-dashboard/historical';
import Scenario from '../views/tactic-dashboard/scenario';

class MainRoute extends Component {
	render() {
		return (
				<Switch>
					<Route exact path="/" component={OperationalDashboard} />
					<Route path="/tactic/history" component={Historical} />
					<Route path="/tactic/scenario" component={Scenario} />
				</Switch>
		);
	}
}

export default MainRoute;