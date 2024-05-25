import { BACK_BASE_URL } from '@/constants'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // ADAPTAR SI ES EL CASO
  const form = {
    productos_de_oferta: req.body.offer,
    centro_elegido: req.body.center,
    dia_elegido: req.body.day,
    hora_elegida: req.body.hour
  }
  console.log(form)
  const token = getCookie('access', { req, res })
  const config = { headers: { Authorization: `Bearer ${token}` } }
  // METER URL CORRECTA
  await axios
    .post(`${BACK_BASE_URL}<URL>`, form, config)
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
