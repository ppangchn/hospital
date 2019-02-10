import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import { BarChart } from '../../components/BarChart';


class PrepareQueueing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-2">2</div>
        <div className="col-10"><BarChart/></div>
      </div>
    )
  }
}

export default PrepareQueueing