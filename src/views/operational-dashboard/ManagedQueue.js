import React,{Component} from 'react';

class ManagedQueue extends Component {
    render() {
        return (
            <div className="d-flex m-1 text-center">
				<div className="d-flex flex-column card-box mr-1">
					<div className="queue-number">8</div>
					<div>รอจัด</div>
				</div>
				<div className="d-flex flex-column card-box">
					<div className="queue-number">8</div>
					<div>กำลังจัด</div>
				</div>
			</div>
        )
    }
}

export default ManagedQueue