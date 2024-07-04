import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

const data = [

    {
        name: "Confirmados", value: 41
    },
    {
        name: "Rechazados", value: 10
    },
    {
        name: "Cancelados", value: 13
    }
]

const COLORS=['#15803d', '#1e3a8a', '#be123c']
const SimplePieCharts = (props: any) => {

    return (
        <div className="flex flex-col items-center">
            <p className="text-black font-semibold text-xl">Intercambios totales</p>
            <ResponsiveContainer width={250} aspect={1}>
                <PieChart>
                    <Pie
                        dataKey='value'
                        data={data}
                        innerRadius={70}
                        outerRadius={110}
                        fill="#82ca9d"
                    >
                        {data.map((entry,index)=>(
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
export default SimplePieCharts
