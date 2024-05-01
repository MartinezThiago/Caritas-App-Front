import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

import axios from 'axios'

import { BACK_BASE_URL } from '@/constants'
import { setToken } from '@/utils'

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
  
  await axios
    .post(`${BACK_BASE_URL}Login/iniciarSesion`, formData)
    .then((result: any) => {
      
      setToken(
        'access',
        result.data,
        req,
        res,
        // new Date(new Date().setSeconds(new Date().getSeconds() + 3))
      )

      res.status(result.status).json({})
    },
    )
    .catch((result: any) => {
      try {
        res.status(result.status).json({ message: result.data.message })
      } catch {
        res.status(500).json({ message: 'Credenciales incorrectas vuelve a intentarlo.' })
      }
    },
    )
}
