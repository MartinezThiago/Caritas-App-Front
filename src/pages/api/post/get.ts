import type {
    NextApiRequest,
    NextApiResponse
  } from 'next'
  
  import axios from 'axios'
  
  import { BACK_BASE_URL } from '@/constants'
  
  
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
    const body = req.body
    await axios
      .get(`${BACK_BASE_URL}CaritasBack/getPublicacion?idPublicacion=${body.id}`)
      .then((result: any) => {        
        res.status(result.status).json(result.data)      
      },
      )
      .catch((result: any) => {
        try {
          res.status(result.status).json({ message: result.data.message })
        } catch {
          res.status(500).json({ message: 'Ah ocurrido un error inesperado.' })
        }
      },
      )
  }
  