import React, { Component } from 'react';
import '../../css/operational-dashboard/Header.css';
import '../../css/Layout.css';
class Header extends Component {
	render() {
		return (
			<div className="d-flex text-center m-1">
				<div className="flex-fill header-container mr-2">รอคิว</div>
				<div className="flex-fill header-container">กำลังทำงาน</div>
			</div>
		);
	}
}

export default Header;
