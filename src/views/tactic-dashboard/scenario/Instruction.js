import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    font-size: 1.3em;
    right: 3em;
    position: relative;
`
class Instruction extends Component {
    render() {
        return (<Container className="mt-5 flex-grow-1">
            <div className="font-weight-bold">How to use</div>1. Select month<br />2. Fill number of staffs<br />3. Estimated waiting time will appear
        </Container>)
    }
}

export default Instruction