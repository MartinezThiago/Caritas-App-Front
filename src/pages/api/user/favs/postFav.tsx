import type {
    NextApiRequest,
    NextApiResponse
} from 'next'

import axios from 'axios'

import { BACK_BASE_URL } from '@/constants'
import { getUser } from '@/utils/cookies'
import { getCookie } from 'cookies-next'
import router, { useRouter } from "next/router";

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
    const token = getCookie('access', { req, res })
    const { userId } = getUser(req, res)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    const formData = req.body

    await axios
        .post(`${BACK_BASE_URL}CaritasBack/modificarFavorito`, formData, config)
        .then((result: any) => {
            res.status(result.status).json(result.data)
        },
        ).catch((result: any) => {
            try {
                res.status(result.status).json({ message: result.data.message })
            } catch {
                res.status(500).json({ message: 'Ha ocurrido un error inesperado al momento de guardar/desguardar.' })
            }
        })
}
