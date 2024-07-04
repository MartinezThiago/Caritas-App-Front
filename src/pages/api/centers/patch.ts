import { BACK_BASE_URL } from '@/constants'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = getCookie('access', { req, res })

  await axios
    .patch(`${BACK_BASE_URL}CaritasBack/modificar-centrovick`, {
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
