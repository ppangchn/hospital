import React, { Component } from 'react';
import '../../css/operational-dashboard/Header.css';
import '../../css/Layout.css';
import styled from 'styled-components';
const Container = styled.div`
	background-color: rgb(223, 221, 221);
`;
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// console.log(this.props);
		return (
			<Container className="d-flex bd-highlight">
				<div className="pl-1 pt-2 pb-2 pr-1 bd-highlight" style={{ width: '97px' }}>
					<div className="flex-fill header-container  d-flex align-items-center justify-content-center">
						{this.props.isLoading ? (
							<div className="spinner-border" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<div className="pr-2 pt-2 pb-2 d-flex flex-grow-1 bd-highlight">
					<div className="header-container" style={{ width: '31.7em' }}>
						รอคิว
					</div>
					<div className="header-container ml-1 pl-0" style={{ width: '31.7em' }}>
						กำลังทำงาน
					</div>
				</div>
			</Container>
		);
	}
}

export default Header;
