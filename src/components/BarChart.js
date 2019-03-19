import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';

export function BarChart(props) {
	console.log(props)
	return (
		<ResponsiveContainer width="100%" height="80%" style={{fontSize: '11px'}}>
			<Chart data={props.data}>
				<CartesianGrid strokeDasharray="1 1" />
				<XAxis dataKey="name" />
				<YAxis dataKey="value" />
				<Bar dataKey="value" fill="#8884d8" />
			</Chart>
		</ResponsiveContainer>
	);
}


// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]