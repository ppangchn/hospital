import React, { Component } from 'react';
import '../../css/operational-dashboard/Queue.css';
import '../../css/Layout.css';
class Queue extends Component {
	managedQueue() {
		return (
			<div className="d-flex m-1 txt-center">
				<div className="d-flex flex-column card-box mr-1">
					<div className="queue-number">8</div>
					<div>รอจัด</div>
				</div>
				<div className="d-flex flex-column card-box">
					<div className="queue-number">8</div>
					<div>กำลังจัด</div>
				</div>
			</div>
		);
	}
	boiledQueue() {
		return (
			<div className="d-flex m-1 txt-center">
				<div className="d-flex flex-column card-box mr-1">
					<div className="queue-number">100</div>
					<div>รอต้ม</div>
				</div>
				<div className="d-flex flex-column card-box">
					<div className="queue-number">8</div>
					<div>กำลังต้ม</div>
				</div>
			</div>
		);
	}
	paidQueue() {
		return (
			<div className="d-flex m-1 txt-center">
				<div className="d-flex flex-column card-box mr-1">
					<div className="queue-number">8</div>
					<div>รอจ่าย</div>
				</div>
				<div className="d-flex flex-column card-box">
					<div className="queue-number">8</div>
					<div>พร้อมจ่าย</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="d-flex flex-column queue-container">
				<div className="txt-center title queue-title">จำนวนใบยา</div>
				<div className="d-flex justify-content-around ml-3 mr-3">
					<div className="queue-box managed-queue">{this.managedQueue()}</div>
					<div className="queue-box boiled-queue">{this.boiledQueue()}</div>
					<div className="queue-box paid-queue">{this.paidQueue()}</div>
				</div>
			</div>
		);
	}
}

export default Queue;
