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
import React from 'react';

export function BarChart(props) {
	//props = {data,color}
	const { data, color, XAxisLabel, YAxisLabel } = props;
	return (
		<ResponsiveContainer width="90%" height="90%">
			<Chart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis interval={0}>
					<Label value={XAxisLabel} position="insideBottom" offset={-6} style={{ textAnchor: 'middle' }} />
				</XAxis>
				<YAxis>
					<Label angle={-90} value={YAxisLabel} position="insideLeft" style={{ textAnchor: 'middle' }} />
				</YAxis>
				<Tooltip />
				<Legend verticalAlign="top"/>
				{color.map(e => {
					return <Bar dataKey={e.dataKey} fill={e.fill} />;
				})}
			</Chart>
		</ResponsiveContainer>
	);
}

// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]
