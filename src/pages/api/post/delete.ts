import { BACK_BASE_URL } from '@/constants'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData=req.body
  const token = getCookie('access', { req, res })
  const config = { headers: { Authorization: `Bearer ${token}` } }
  console.log('se llego a eliminar publicacion');
  
  await axios
    .post(`${BACK_BASE_URL}CaritasBack/borrarPublicacion`, formData, config)
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
