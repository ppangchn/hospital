import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import BoilingQueueing from "./BoilingQueueing";
import PayingQueueing from "./PayingQueueing";
import PrepareQueueing from "./PrepareQueueing";
import PrepareInProgress from './PrepareInProgress';
import BoilingInProgress from './BoilingInProgress';
import PayingInProgress from './PayingInProgress';


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
        <Preparing />
        <Boiling />
        <Paying />
      </Container>
    );
  }
}

const Preparing = () => {
  return (
    <div className="d-flex bd-highlight table-row mb-2">
      <div className="p-2 bd-highlight cell " style={{ width: "100px" }}>
        <div className="flex-fill header-container cell d-flex align-items-center justify-content-center pre-title-cell flex-column">
          <h4>จัดยา</h4>
          <i class="fas fa-file-prescription" style={{ fontSize: "50px" }}></i>
        </div>
      </div>

      <div className="p-2 flex-grow-1 bd-highlight row">
        <PrepareQueueing />
        <PrepareInProgress/>
      </div>
    </div>
  );
};

const Boiling = () => {
  return (
    <div className="d-flex bd-highlight table-row mb-2">
      <div className="p-2 bd-highlight cell " style={{ width: "100px" }}>
        <div className="flex-fill header-container cell d-flex align-items-center justify-content-center boil-title-cell flex-column">
          <h4>ต้มยา</h4>
          <i class="fas fa-mug-hot" style={{ fontSize: "50px" }}></i>
        </div>
      </div>

      <div className="p-2 flex-grow-1 bd-highlight row">
        <BoilingQueueing />
        <BoilingInProgress/>
      </div>
    </div>
  );
};

const Paying = () => {
  return (
    <div className="d-flex bd-highlight table-row mb-2">
      <div className="p-2 bd-highlight cell " style={{ width: "100px" }}>
        <div className="flex-fill header-container cell d-flex align-items-center justify-content-center pay-title-cell flex-column">
          <h4>จ่ายยา</h4>
          <i class="fas fa-handshake" style={{ fontSize: "50px" }}></i>
        </div>
      </div>

      <div className="p-2 flex-grow-1 bd-highlight row">
        <PayingQueueing />
        <PayingInProgress/>
      </div>
    </div>
  );
};

export default Dashboard;
