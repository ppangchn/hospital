import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OperationalDashboard from '../views/operational-dashboard';
import Historical from '../views/tactic-dashboard/historical';
import Scenario from '../views/tactic-dashboard/scenario';
import StaffDashboard from '../views/staff';
import LimitDashboard from '../views/operational-dashboard/limit-time';

class MainRoute extends Component {
	render() {
		return (
				<Switch>
					<Route exact path="/" component={OperationalDashboard} />
					<Route path="/staff" component={StaffDashboard}/>
					<Route path="/limit" component={LimitDashboard}/>
					<Route path="/tactic/history" render={(props) => <Historical {...props}/>} />
					<Route path="/tactic/scenario" component={Scenario} />
				</Switch>
		);
	}
}

export default MainRoute;
