import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';

export function BarChart(props) {
	console.log(props)
	return (
		<ResponsiveContainer width="80%" height="80%" >
			<Chart data={[{ name: 'a', value: 12, a: 100 },{ name: 'a', value: 32, a: 342 },{ name: 'a', value: 111, a: 33 },{ name: 'a', value: 45, a: 1 }]}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis dataKey="value" />
				<Tooltip />
				<Legend />
				<Bar dataKey="value" fill="#8884d8" />
				<Bar dataKey="a" fill="#82ca9d" />
			</Chart>
		</ResponsiveContainer>
	);
}

