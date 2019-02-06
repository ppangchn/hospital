import React, { Component } from 'react';
import '../../css/tactic-dashboard/TacticDashboard.css';
import '../../css/Layout.css';
class Sidebar extends Component {
	picking() {
		return (
			<div className=" mb-3">
				<div className="sidebar-title p-1 pl-2">Picking</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Day</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Month</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze 3 Months</div>
			</div>
		);
	}
	decocting() {
		return (
			<div className="mb-3">
				<div className="sidebar-title p-1 pl-2">Decocting</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Day</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Month</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze 3 Months</div>
			</div>
		);
	}
	dispensing() {
		return (
			<div className="mb-3">
				<div className="sidebar-title p-1 pl-2">Dispensing</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Day</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze by Month</div>
				<div className="sidebar-subtitle p-1 pl-2">Analyze 3 Months</div>
			</div>
		);
	}
	render() {
		return (
			<div className="d-flex flex-column mt-3">
				<div className="sidebar-title mb-3 p-1 pl-2">Overall Process</div>
				{this.picking()}
				{this.decocting()}
				{this.dispensing()}
				<button type="button" className="btn btn-secondary btn-sm w-10 ml-1 mb-1">Historical Data</button>
				<button type="button" className="btn btn-secondary btn-sm w-10 ml-1 mb-4">Scenario Test</button>
			</div>
		);
	}
}

export default Sidebar;
