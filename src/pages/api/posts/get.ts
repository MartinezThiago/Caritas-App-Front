import { BACK_BASE_URL } from '@/constants'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export const config = {
  api: {
    responseLimit: '8mb',
  },
}
/**
 * Async handler function that sends the signin form data to the external server.
 * Filters the response and retrieves the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await axios
    .get(`${BACK_BASE_URL}CaritasBack/getPublicaciones`)
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
