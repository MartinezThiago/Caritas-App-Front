import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'


const SimpleBarCharts = (props: any) => {

    return (
        <div className="flex flex-col items-center ">
            <p className="text-black font-semibold text-xl ms-[50px]">{props.type === 'center' ? 'Localidades con mas intercambios' : 'Categorias con mas intercambios'}</p>
            <ResponsiveContainer width={380} aspect={1}>
                <BarChart
                    data={props.data}

                >
                    <CartesianGrid strokeDasharray='4 1 2' />
                    <XAxis dataKey={"nombre"}></XAxis>
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey={'CantidadConfirmados'} fill='#15803d' />
                    {props.type === 'center' ? <Bar dataKey={'CantidadRechazados'} fill='#be123c' /> : <></>}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default SimpleBarCharts
