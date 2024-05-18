export const makeHoursList = (raw: any, center: any) => {
  return Array.from(
    {
      length:
        Number(raw[Number(center)].horario_cierre.split(':')[0]) -
        Number(raw[Number(center)].horario_apertura.split(':')[0])
    },
    (_, i) => i
  ).map(hour => ({
    value: (
      hour + Number(raw[Number(center)].horario_apertura.split(':')[0])
    ).toString(),
    label: `${
      hour + Number(raw[Number(center)].horario_apertura.split(':')[0])
    }:00`
  }))
}
