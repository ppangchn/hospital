import { BarChart as  XAxis, YAxis, Bar, CartesianGrid, ResponsiveContainer,Label, Line, ComposedChart,Cell ,Tooltip} from 'recharts';
import React, { PureComponent } from 'react';

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-10} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}


export function BarChart(props) {
	//props = {data,color}
  const {data} = props;
  // // console.log(data);
	return (
		<ResponsiveContainer width="100%" height="80%" >
			<ComposedChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick />}/>
				<YAxis domain={[0,100]} >
        <Label angle={-90} value='Minutes' position='insideLeft' style={{textAnchor: 'middle'}} />
        </YAxis>
        <Tooltip />

        <Bar dataKey="value" fill="#8884d8" barSize={10}>
          {
            data.map((entry, index) => (

              <Cell key={`cell-${index}`} fill={data[index].value > data[index].limit ? 'red' : '#1114d8'} />
            ))
          }
        </Bar>
        <Line dataKey="limit" dot={false} stroke="red"/>
			</ComposedChart>
		</ResponsiveContainer>
	);
}


// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]