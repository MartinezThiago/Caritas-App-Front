export const makeHoursList = (raw: any, center: any) => {
  for (let index = 0; index < raw.length; index++) {
    if(raw[index].id_centro === center){
      center=index
    }
  }
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
