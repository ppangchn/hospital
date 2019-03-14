import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import { BarChart } from "../../components/BarChart";

const InQueue = styled.div`
  background-color: rgb(151,210,214);
  color: black;
`

const Queue = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`
const MyChart = styled.div`
   background-color: white;
   height: 90%;
   width:90%;
   border-radius: 5% ;
   box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`
const ChartFrame = styled.div`
  padding: 0px 0px 0px 0px;
`


class PrepareInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <InQueue className="col header-container cell ml-1">
        <div className="row">
          <div className="col-3 cell" >
            <div className="d-flex justify-content-center align-items-center cell flex-column">
              <h5>กำลังจัด[ใบ]</h5>
              <Queue className="d-flex justify-content-center align-items-center">5</Queue>
            </div>
          </div>
          <ChartFrame className="col-9 cell d-flex justify-content-center align-items-center">

          </ChartFrame>
        </div>
      </InQueue>
    );
  }
}

export default PrepareInProgress;
