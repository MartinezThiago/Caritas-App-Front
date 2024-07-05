import { BACK_BASE_URL } from '@/constants'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = getCookie('access', { req, res })
  //console.log(req.body);
  let diasArray = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  let newDias: any = []
  req.body.dias.map((e: any) => {
    let index = (diasArray.indexOf(e)) + 1
    newDias.push(index)
  })
  const formDataAdapted = {
    dias: newDias,
    nombre_centro: req.body.nombre_centro,
    ubicacion: req.body.ubicacion,
    direccion: req.body.direccion,
    horario_apertura: req.body.horario_apertura,
    horario_cierre: req.body.horario_cierre
  }
  console.log(formDataAdapted);

  await axios
    .post(`${BACK_BASE_URL}CaritasBack/insertarCentro`,formDataAdapted, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((result: any) => {
      res.status(result.status).json(result.data)
    })
    .catch((result: any) => {
      try {
        res.status(result.status).json({ message: result.data.message })
      } catch {
        res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
      }
    })
}
