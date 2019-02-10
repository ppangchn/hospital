import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import BoilingQueueing from './BoilingQueueing';
import PayingQueueing from './PayingQueueing';
import PrepareQueueing from './PrepareQueueing';

const Container = styled.div`
  background-color: rgb(223, 221, 221);
  height: 100vh;
`;
const HeaderCell = styled.div`
  background-color: white;
  margin: 5px 0px 5px 0px;
`;
class Dashboard extends Component {
  render() {
    return (
      <Container>
        <div className="row table-header">
          <div className="col-2" />
          <HeaderCell className="col-5 d-flex justify-content-center align-items-center">
            Queueing
          </HeaderCell>
          <HeaderCell className="col-5 d-flex justify-content-center align-items-center">
            Working
          </HeaderCell>
        </div>
        <Preparing />
        <Boiling />
        <Paying />
      </Container>
    );
  }
}

const TaskRow = styled.div`
  height: 30vh;
`;
const Preparing = () => {
  return <TaskRow className="row">
	<div className="col-2 d-flex justify-content-center align-items-center">Title</div>
	<div className="col-5"><PrepareQueueing/></div>
	<div className="col-5"></div></TaskRow>;
};

const Boiling = () => {
  return <TaskRow className="row">
	<div className="col-2 d-flex justify-content-center align-items-center">Title</div>
	<div className="col-5"><BoilingQueueing/></div>
	<div className="col-5"></div></TaskRow>;
};

const Paying = () => {
  return <TaskRow className="row">
	<div className="col-2 d-flex justify-content-center align-items-center">Title</div>
	<div className="col-5"><PayingQueueing/></div>
	<div className="col-5"></div></TaskRow>;
};

export default Dashboard;
