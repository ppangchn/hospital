import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';

export function BarChart(props) {
	//props = {data,color}
	const {data,color,YAxis} = props;
	return (
		<ResponsiveContainer width="100%" height="80%" >
			<Chart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis/>
				<Tooltip />
				{color.map(e => {
					console.log(e)
					return <Bar dataKey={e.dataKey} fill={e.fill}/>
				})}
			</Chart>
		</ResponsiveContainer>
	);
}


// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]