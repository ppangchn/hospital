import React,{Component} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
class TacticDashboard extends Component {
    render() {
        return (
            <div className="d-flex flex-column"><Header /><Dashboard /></div>
        );
    }
}

export default TacticDashboard