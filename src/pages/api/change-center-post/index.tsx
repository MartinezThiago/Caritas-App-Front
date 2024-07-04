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
    //const body = req.body
    //console.log(req.body);
    const desdeAux = () => {
        const auxArrMap: string[] = Object.values(req.body.desde);
        const auxArr: string[] = [];
        auxArrMap.map((e: string) => {
            e.length === 1 ? auxArr.push(`0${e}:00`) : auxArr.push(`${e}:00`);
        });
        return auxArr;
    };
    const hastaAux = () => {
        const auxArrMap: string[] = Object.values(req.body.hasta);
        const auxArr: string[] = [];
        auxArrMap.map((e: string) => {
            e.length === 1 ? auxArr.push(`0${e}:00`) : auxArr.push(`${e}:00`);
        });
        return auxArr;
    };
    const formatHour = (h: string) => {
        return h.length === 1 ? `0${h}:00`:`${h}:00`
      }
    const formData = {
        id_centro_nuevo: parseInt(req.body.id_centro_nuevo),
        id_centro_viejo: req.body.id_centro_viejo,
        id_publicacion: req.body.id_publicacion,
        desde: formatHour(req.body.desde),
        hasta: formatHour(req.body.hasta),
        dias: req.body.dias
    }
    console.log(formData);

    const token = getCookie('access', { req, res })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    await axios
        .post(`${BACK_BASE_URL}CaritasBack/cambiarCentro`, formData, config)
        .then((result: any) => {
            res.status(result.status).json(result.data)
        },
        )
        .catch((result: any) => {
            try {
                res.status(result.status).json({ message: result.data.message })
            } catch {
                res.status(500).json({ message: 'Ha ocurrido un error al cambiar el centro.' })
            }
        },
        )
}