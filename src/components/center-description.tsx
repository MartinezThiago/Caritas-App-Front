import { useState } from "react"
import { days } from "@/types"
export default function CenterDescription({
    idCenter,
    name,
    location,
    address,
    openingTime,
    closingTime,
    workDays,
    onPost,
    daysPostTrade
}: {
    idCenter: number
    name: string
    location: string
    address: string
    openingTime: string
    closingTime: string
    workDays?: days[]
    onPost: boolean
    daysPostTrade?: string[]
}) {
    const auxDaysCenters: string[] = []
    if (!onPost) {
        workDays!.map((e: days) => {
            auxDaysCenters.push(e.descripcion)
        })
    }
    if (onPost) {
        daysPostTrade!.map((e: string) => {
            auxDaysCenters.push(e)
        })
    }
    const dias = auxDaysCenters.map((e: string) => {
        return `${e} `
    })
    const checkDaysOfWeek = () => {
        const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        const allDaysIncluded = daysOfWeek.every(day => auxDaysCenters.includes(day) && auxDaysCenters.length === daysOfWeek.length);
        return (allDaysIncluded ? true : false)
    };

    return (
        <div className="my-2">
            <p className="text-rose-700 text-l font-bold">{name}</p>
            <div className="mx-2 text-black">
                <p><span className="font-semibold ">Localidad: </span> {location}</p>
                <p><span className="font-semibold ">Direccion: </span> {address}</p>
                <p><span className="font-semibold">Dias: </span>{onPost ? dias : checkDaysOfWeek() ? 'Dias Hábiles' : dias}</p>
                <p><span className="font-semibold">Horarios:</span> {openingTime} - {closingTime}</p>
            </div>
        </div>
    )

}