export default function CenterDescription({
    idCenter,
    name,
    location,
    address,
    openingTime,
    closingTime,
    workDays
}: {
    idCenter: number
    name: string
    location: string
    address: string
    openingTime: string
    closingTime: string
    workDays: string[]
}) {
    const dias = workDays.map((e: string) => {
        return `${e} `
    })
    return (
        <div className="my-2">
            <p className="text-rose-700 text-l font-bold">{name}</p>
            <div className="mx-2">
                <p><span className="font-semibold ">Direccion:</span> {address}</p>
                <p><span className="font-semibold">Dias: </span>{dias}</p>
                <p><span className="font-semibold">Horarios:</span> {openingTime} - {closingTime}</p>
            </div>
        </div>
    )

}