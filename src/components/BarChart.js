import {
	BarChart as Chart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
	Label,
} from 'recharts';
import React, { PureComponent } from 'react';
class CustomizedAxisTick extends PureComponent {
	render() {
		const { x, y, payload } = this.props;
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={0} y={-10} dy={16} textAnchor="end" fill="#666" transform={`rotate(${this.props.isItalic ? "-25" : "0"})`}>
					{payload.value}
				</text>
			</g>
		);
	}
}
export function BarChart(props) {
	//props = {data,color}
	const { data, color, XAxisLabel, YAxisLabel , isItalic} = props;
	return (
		<ResponsiveContainer width="90%" height="90%">
			<Chart data={data} style={{ fontSize: '12px' }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick isItalic={isItalic}/>}>
					<Label value={XAxisLabel} position="insideBottom" offset={-4} style={{ textAnchor: 'middle' }} />
				</XAxis>
				<YAxis>
					<Label angle={-90} value={YAxisLabel} position="insideLeft" style={{ textAnchor: 'middle' }} />
				</YAxis>
				<Tooltip itemSorter={() => 1} />
				<Legend verticalAlign="top" />
				{color.map((e,index) => {
					return <Bar key={index} dataKey={e.dataKey} fill={e.fill} />;
				})}
			</Chart>
		</ResponsiveContainer>
	);
}

// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]
