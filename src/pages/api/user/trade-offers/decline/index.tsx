import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'

import { BACK_BASE_URL } from '@/constants'
import { getCookie } from 'cookies-next'
import { getUser } from '@/utils'

/**
 * Async handler function that sends the signin form data to the external server.
 * Filters the response and retrieves the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    const token = getCookie('access', { req, res })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    const formData = req.body
    console.log(formData);
    
    await axios
        .post(`${BACK_BASE_URL}CaritasBack/rechazarCancelarOferta`,formData, config)
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
