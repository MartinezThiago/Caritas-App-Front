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
    id_publicacion_a_la_que_se_oferta: parseInt(req.body.post),
    id_publicacion_con_la_que_se_oferta: parseInt(req.body.offer),
    id_usuario_duenio_publicacion_a_la_que_se_oferta: req.body['post-user-id'],
    id_usuario_que_oferta: parseInt(req.body['bidding-user-id']),
    centro_elegido: req.body.center,
    dia_elegido: req.body.day,
    hora_elegida: req.body.hour
  }

  const token = getCookie('access', { req, res })
  const config = { headers: { Authorization: `Bearer ${token}` } }
  // METER URL CORRECTA
  await axios
    .post(`${BACK_BASE_URL}CaritasBack/ofertarPublicacion`, form, config)
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
