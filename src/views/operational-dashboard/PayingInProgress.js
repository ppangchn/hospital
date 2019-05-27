import React, { Component } from 'react';
import styled from 'styled-components';
import '../../css/operational-dashboard/OperationalDashboard.css';
const ChartFrame = styled.div`
	padding: 0px 0px 0px 0px;
`;
const InQueue = styled.div`
	background-color: rgb(189, 150, 241);
	color: black;
`;

const Queue = styled.div`
	width: 100px;
	height: 50px;
	background-color: white;
	box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`;
class PayingInProgress extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<InQueue className="col header-container cell ml-1 pr-0">
				<div className="row">
					<div className="col-2 cell" style={{ bottom: '13px' }}>
						<div className="d-flex justify-content-center align-items-center cell flex-column">
							<div style={{ fontSize: '12px', marginBottom: '5px' }}>พร้อมจ่าย[ใบ]</div>
							<Queue
								className="d-flex justify-content-center align-items-center"
								style={{ width: '80px', height: '40px' }}
							>
								{this.props.dispense.length}
							</Queue>
						</div>
					</div>
					<ChartFrame className="col-10 cell d-flex justify-content-center align-items-center" />
				</div>
			</InQueue>
		);
	}
}

export default PayingInProgress;
