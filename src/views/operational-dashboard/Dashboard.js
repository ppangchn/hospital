import React, { Component } from 'react';
import styled from 'styled-components';
import '../../css/operational-dashboard/OperationalDashboard.css';
import BoilingQueueing from './BoilingQueueing';
import PayingQueueing from './PayingQueueing';
import PrepareQueueing from './PrepareQueueing';
import PrepareInProgress from './PrepareInProgress';
import BoilingInProgress from './BoilingInProgress';
import PayingInProgress from './PayingInProgress';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Sound from 'react-sound';

const Container = styled.div`
	background-color: rgb(223, 221, 221);
	height: 100vh;
`;
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pick_q: [],
			pick: [],
			decoct_q: [],
			decoct: [],
			dispense_q: [],
			dispense: [],
			finish: [],
			sound_status: Sound.status.STOPPED,
		};
	}
	intervalID = 0;
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	async setLimit() {
		try {
			if (!localStorage.getItem('limit')) {
				const res = await Axios.get('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/dashboard/limit');
				console.log('get per80', res.data);
				const { pick, decoct, dispense } = res.data;

				const limit = `${parseInt(pick.per80 / 60)},${parseInt(pick.per80 % 60)},${parseInt(decoct.per80 / 60)},${parseInt(decoct.per80 % 60)},${parseInt(dispense.per80 / 60)},${parseInt(dispense.per80 % 60)}`
				localStorage.setItem('limit', limit)
			}
		} catch (error) {

		}
	}
	async componentDidMount() {
		try {
			this.setLimit();
			this.props.setLoading(true);
			const res = await Axios.get('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/dashboard/realtime');
			const { data } = res;
			const { pick_q, pick, decoct_q, decoct, dispense_q, dispense, finish } = data;
			this.setState({
				pick_q,
				pick,
				decoct_q,
				decoct,
				dispense_q,
				dispense,
				finish,
			});
			this.props.setLoading(false);
			this.intervalID = setInterval(async () => {
				this.props.setLoading(true);
				const res = await Axios.get('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/dashboard/realtime');
				const { data } = res;
				const { pick_q, pick, decoct_q, decoct, dispense_q, dispense, finish } = data;
				this.checkReachLimit(data)
				this.setState({
					pick_q,
					pick,
					decoct_q,
					decoct,
					dispense_q,
					dispense,
					finish,
				});
				// console.log(data);
				this.props.setLoading(false);
			}, 3000);
		} catch (e) {
			// console.log(e);
		}
  }
  checkReachLimit(data) {
		if(!data) return
    const {  pick_q,  decoct_q,  dispense_q } = data;
    let isOverTime = false
    const limit = localStorage.getItem('limit')
    if (limit) {
	  const limitTime = limit.split(',');
      const pick_limit = (+limitTime[0])*60 + (+limitTime[1])
      const decoct_limit = (+limitTime[2])*60 + (+limitTime[3])
      const dispense_limit = (+limitTime[4])*60 + (+limitTime[5])
      // console.log('limit',pick_limit,decoct_limit,dispense_limit);
      pick_q.forEach(pre => {
		  // console.log('earth',pre);
        if(pre.time/60 > pick_limit) isOverTime = true
      })
      decoct_q.forEach(pre => {
        if(pre.time/60 > decoct_limit) isOverTime = true
      })
      dispense_q.forEach(pre => {
        if(pre.time/60 > dispense_limit) isOverTime = true
      })
    }
    if(isOverTime){
      // console.log('play');
      this.setState({sound_status:Sound.status.PLAYING})
    }
    else {
      // console.log('stop');
      this.setState({sound_status:Sound.status.STOPPED})
    }
  }
	render() {
		return (
			<Container className="d-flex flex-column">
				<Sound url="/alert.mp3" playStatus={this.state.sound_status} autoLoad={true} />
				{/* <button
					onClick={() => {
						this.setState({ sound_status: Sound.status.PLAYING });
					}}
				/>
				<button
					onClick={() => {
						this.setState({ sound_status: Sound.status.STOPPED });
					}}
				/> */}
				<Preparing pick_q={this.state.pick_q} pick={this.state.pick} />
				<Boiling decoct_q={this.state.decoct_q} decoct={this.state.decoct} />
				<Paying dispense_q={this.state.dispense_q} dispense={this.state.dispense} />
				<div className="pt-2 pr-2 mb-1 d-flex justify-content-end">
					<i className="fas fa-chart-line pr-2" style={{ fontSize: '2.5em', cursor: 'pointer' }} onClick={() => this.props.history.push('/limit')} />
					<i className="fas fa-user-friends" style={{ fontSize: '2em', cursor: 'pointer' }} onClick={() => this.props.history.push('/staff')} />
				</div>
			</Container>
		);
	}
}

const Preparing = props => {
	// // console.log(props);
	return (
		<div className="d-flex bd-highlight table-row">
			<div className="pt-2 pb-2 pl-1 bd-highlight cell " style={{ width: '93px' }}>
				<div className="flex-fill header-container cell d-flex align-items-center justify-content-center pre-title-cell flex-column">
					<h4>จัดยา</h4>
					<i className="fas fa-file-prescription" style={{ fontSize: '50px' }} />
				</div>
			</div>

			<div className="pr-2 pt-2 pb-2 flex-grow-1 bd-highlight d-flex">
				<PrepareQueueing pick_q={props.pick_q} />
				<PrepareInProgress pick={props.pick} />
			</div>
		</div>
	);
};

const Boiling = props => {
	return (
		<div className="d-flex bd-highlight table-row">
			<div className="pt-2 pb-2 pl-1 bd-highlight cell " style={{ width: '93px' }}>
				<div className="flex-fill header-container cell d-flex align-items-center justify-content-center boil-title-cell flex-column">
					<h4>ต้มยา</h4>
					<i className="fas fa-mug-hot" style={{ fontSize: '50px' }} />
				</div>
			</div>

			<div className="pr-2 pt-2 pb-2 flex-grow-1 bd-highlight d-flex">
				<BoilingQueueing decoct_q={props.decoct_q} />
				<BoilingInProgress decoct={props.decoct} />
			</div>
		</div>
	);
};

const Paying = props => {
	return (
		<div className="d-flex bd-highlight table-row">
			<div className="pt-2 pb-2 pl-1 bd-highlight cell " style={{ width: '93px' }}>
				<div className="flex-fill header-container cell d-flex align-items-center justify-content-center pay-title-cell flex-column">
					<h4>จ่ายยา</h4>
					<i className="fas fa-handshake" style={{ fontSize: '50px' }} />
				</div>
			</div>

			<div className="pr-2 pt-2 pb-2 flex-grow-1 bd-highlight d-flex">
				<PayingQueueing dispense_q={props.dispense_q} />
				<PayingInProgress dispense={props.dispense} />
			</div>
		</div>
	);
};

export default withRouter(Dashboard);
