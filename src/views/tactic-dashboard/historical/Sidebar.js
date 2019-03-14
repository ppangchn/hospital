import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../../css/tactic-dashboard/TacticDashboard.css';
import '../../../css/tactic-dashboard/Sidebar.css';
import '../../../css/Layout.css';

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {
			isActiveOverall: false,
			isActivePickingDay: false,
			isActivePickingMonth: false,
			isActivePickingThreeMonths: false,
			isActiveDecoctingDay: false,
			isActiveDecoctingMonth: false,
			isActiveDecoctingThreeMonths: false,
			isActiveDispensingDay: false,
			isActiveDispensingMonth: false,
			isActiveDispensingThreeMonths: false,
		};
	}
	changeLocation(query) {
		this.clear();
		this.props.history.push({
			pathname: '/history',
			search: `?${query}`,
			state: { title: query },
		});
	}
	clear() {
		this.setState({
			isActiveOverall: false,
			isActivePickingDay: false,
			isActivePickingMonth: false,
			isActivePickingThreeMonths: false,
			isActiveDecoctingDay: false,
			isActiveDecoctingMonth: false,
			isActiveDecoctingThreeMonths: false,
			isActiveDispensingDay: false,
			isActiveDispensingMonth: false,
			isActiveDispensingThreeMonths: false,
		});
	}
	picking() {
		const { isActivePickingMonth, isActivePickingThreeMonths, isActivePickingDay } = this.state;
		return (
			<div className=" mb-3">
				<div className="sidebar-title-nohover p-1 pl-2">Picking</div>
				<div
					className={`p-1 pl-2 ${isActivePickingDay ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('pickingDay');
						this.setState({ isActivePickingDay: true });
					}}
				>
					Analyze by Day
				</div>
				<div
					className={`p-1 pl-2 ${isActivePickingMonth ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('pickingMonth');
						this.setState({ isActivePickingMonth: true });
					}}
				>
					Analyze by Month
				</div>
				<div
					className={`p-1 pl-2 ${
						isActivePickingThreeMonths ? 'sidebar-subtitle-active' : 'sidebar-subtitle'
					}`}
					onClick={() => {
						this.changeLocation('pickingThreeMonths');
						this.setState({ isActivePickingThreeMonths: true });
					}}
				>
					Analyze 3 Months
				</div>
			</div>
		);
	}
	decocting() {
		const { isActiveDecoctingDay, isActiveDecoctingMonth, isActiveDecoctingThreeMonths } = this.state;
		return (
			<div className="mb-3">
				<div className="sidebar-title-nohover p-1 pl-2">Decocting</div>
				<div
					className={`p-1 pl-2 ${isActiveDecoctingDay ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('decoctingDay');
						this.setState({ isActiveDecoctingDay: true });
					}}
				>
					Analyze by Day
				</div>
				<div
					className={`p-1 pl-2 ${isActiveDecoctingMonth ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('decoctingMonth');
						this.setState({ isActiveDecoctingMonth: true });
					}}
				>
					Analyze by Month
				</div>
				<div
					className={`p-1 pl-2 ${
						isActiveDecoctingThreeMonths ? 'sidebar-subtitle-active' : 'sidebar-subtitle'
					}`}
					onClick={() => {
						this.changeLocation('decoctingThreeMonths');
						this.setState({ isActiveDecoctingThreeMonths: true });
					}}
				>
					Analyze 3 Months
				</div>
			</div>
		);
	}
	dispensing() {
		const { isActiveDispensingThreeMonths, isActiveDispensingDay, isActiveDispensingMonth } = this.state;
		return (
			<div className="mb-3">
				<div className="sidebar-title-nohover p-1 pl-2">Dispensing</div>
				<div
					className={`p-1 pl-2 ${isActiveDispensingDay ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('dispensingDay');
						this.setState({ isActiveDispensingDay: true });
					}}
				>
					Analyze by Day
				</div>
				<div
					className={`p-1 pl-2 ${isActiveDispensingMonth ? 'sidebar-subtitle-active' : 'sidebar-subtitle'}`}
					onClick={() => {
						this.changeLocation('dispensingMonth');
						this.setState({ isActiveDispensingMonth: true });
					}}
				>
					Analyze by Month
				</div>
				<div
					className={`p-1 pl-2 ${
						isActiveDispensingThreeMonths ? 'sidebar-subtitle-active' : 'sidebar-subtitle'
					}`}
					onClick={() => {
						this.changeLocation('dispensingThreeMonths');
						this.setState({ isActiveDispensingThreeMonths: true });
					}}
				>
					Analyze 3 Months
				</div>
			</div>
		);
	}
	render() {
		const { isActiveOverall } = this.state;
		return (
			<div className="d-flex flex-column mt-3">
				<div
					className={` mb-3 p-1 pl-2 ${isActiveOverall ? 'sidebar-title-active' : 'sidebar-title'}`}
					onClick={() => {
						this.changeLocation('');
						this.setState({ isActiveOverall: true });
					}}
				>
					Overall Process
				</div>
				{this.picking()}
				{this.decocting()}
				{this.dispensing()}
				<button type="button" className="btn btn-secondary btn-sm w-10 ml-1 mb-1">
					Historical Data
				</button>
				<button type="button" className="btn btn-secondary btn-sm w-10 ml-1 mb-4">
					Scenario Test
				</button>
			</div>
		);
	}
}

export default withRouter(Sidebar);
