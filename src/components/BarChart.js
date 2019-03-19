import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';

export function BarChart(props) {
	//props = {data,color}
	const {data,color,YAxis} = props;
	return (
<<<<<<< HEAD
		<ResponsiveContainer width="80%" height="80%" >
			<Chart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis dataKey={YAxis}/>
				<Tooltip />
				<Legend />
				{color.map(e => {
					console.log(e)
					return <Bar dataKey={e.dataKey} fill={e.fill}/>
				})}
=======
		<ResponsiveContainer width="100%" height="80%" style={{fontSize: '11px'}}>
			<Chart data={props.data}>
				<CartesianGrid strokeDasharray="1 1" />
				<XAxis dataKey="name" />
				<YAxis dataKey="value" />
				<Bar dataKey="value" fill="#8884d8" />
>>>>>>> 27675fb09bdadc57953e3d705a4ff340d3c5c778
			</Chart>
		</ResponsiveContainer>
	);
}


// [{ name: 'a', value: 12 },{ name: 'a', value: 32 },{ name: 'a', value: 111 },{ name: 'a', value: 45 }]