import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts';
import React from 'react';

export function BarChart() {
	return (
		<Chart width={730} height={250} data={[{ name: 'a', value: 12 ,a:100}][{ name: 'b', value: 5,a:500 }]}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis dataKey="value"/>
			{/* <Tooltip /> */}
			{/* <Legend /> */}
			<Bar dataKey="value" fill="#8884d8" />
			<Bar dataKey="a" fill="#82ca9d" />
		</Chart>
	);
}
