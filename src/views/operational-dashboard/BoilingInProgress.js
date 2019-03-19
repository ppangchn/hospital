import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import { BarChart } from "../../components/BarChart";


const Queue = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`

const InQueue = styled.div`
  background-color: rgb(131,214,132);
  color: black;
  
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
class BoilingInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(props) {
    return (
      <InQueue className="col header-container cell ml-1">
        <div className="row">
          <div className="col-3 cell">
            <div className="d-flex justify-content-center align-items-center cell flex-column">
              <h5>กำลังต้ม[ใบ]</h5>
              <Queue className="d-flex justify-content-center align-items-center">{this.props.decoct.length}</Queue>
            </div>
          </div>
          <ChartFrame className="col-9 cell d-flex justify-content-center align-items-center">

          </ChartFrame>
        </div>
      </InQueue>
    );
  }
}

export default BoilingInProgress;
