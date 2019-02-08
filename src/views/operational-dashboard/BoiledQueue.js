import React,{Component} from 'react';

class BoildedQueue extends Component {
    render() {
        return (
            <div className="d-flex m-1 text-center">
				<div className="d-flex flex-column card-box mr-1">
					<div className="queue-number">100</div>
					<div>รอต้ม</div>
				</div>
				<div className="d-flex flex-column card-box">
					<div className="queue-number">8</div>
					<div>กำลังต้ม</div>
				</div>
			</div>
        )
    }
}

export default BoildedQueue