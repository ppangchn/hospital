import {
	XAxis,
	YAxis,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
	Label,
	Line,
	ComposedChart,
	Cell,
	Legend,
	Tooltip,
} from 'recharts';
import React, { PureComponent } from 'react';
import '../css/operational-dashboard/EarthChart.css';

class CustomizedAxisTick extends PureComponent {
	render() {
		const { x, y, payload } = this.props;
		console.log('eartadsfadsf', this.props);
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={0} y={-10} dy={16} textAnchor="end" fill="#666" transform="rotate(-6)">
					{payload.value}
				</text>
			</g>
		);
	}
}

export function BarChart(props) {
	//props = {data,color}
	const { data } = props;
	console.log('dsafsdf',data);
	return (
		<ResponsiveContainer width="100%" height="90%">
			<ComposedChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick isItalic={true} />}>
					<Label value={'ID ใบยา'} position="insideBottom" style={{ textAnchor: 'middle' }} />
				</XAxis>
				<YAxis  tick={{fontSize:'1.2em'}}  domain={[0, 100]}>
					<Label
						angle={-90}
						value="เวลารอ [นาที]"
						position="insideLeft"
						style={{ textAnchor: 'middle' }}
					/>
				</YAxis>
				<Legend verticalAlign="top" />
				<Tooltip />
				<Bar dataKey="value" fill="#1114d8" barSize={10}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={data[index].value > data[index].limit ? 'red' : '#1114d8'} />
					))}
				</Bar>
				<Line dataKey="limit" dot={false} stroke="red" />
			</ComposedChart>
		</ResponsiveContainer>
	);
}

// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]
