<<<<<<< HEAD
import {
  BarChart as Chart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid
} from "recharts";
import React from "react";

export function BarChart() {
  return (
    <Chart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </Chart>
  );
=======
import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';

export function BarChart() {
	return (
		<ResponsiveContainer width="80%" height="80%">
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
>>>>>>> e4c3ace96f600fb6b31f7047a428fa3a70bbd038
}
const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];
