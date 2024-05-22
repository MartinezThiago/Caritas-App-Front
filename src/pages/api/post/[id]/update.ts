import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

import axios from 'axios'

import { BACK_BASE_URL } from '@/constants'
import { getCookie } from 'cookies-next'

/**
 * Async handler function that sends the signin form data to the external server.
 * Filters the response and retrieves the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const formData = req.body
  const token = getCookie('access', { req, res }) 

  await axios
    .patch(
      `${BACK_BASE_URL}post/`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((result: any) => { res.status(result.status).json({}) })
    .catch((result: any) => {
      try {
        res.status(result.status).json({ message: result.data.message })
      } catch {
        res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
      }
    },
    )
}
