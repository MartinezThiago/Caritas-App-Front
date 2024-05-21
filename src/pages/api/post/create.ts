import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import { BACK_BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";
import { getUser } from "@/utils";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb', // Incrementa el límite a 15MB
    },
  },
};

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
  const token = getCookie("access", { req, res });
  const { userId } = getUser(req, res);
  const formData = req.body;
  //MAPEO A ENTEROS LOS ESTADOS
  const auxState = () => {
    if (formData.status == "Nuevo") {
      return 1;
    } else return 2;
  };
  const desdeAux = () => {
    const auxArrMap: string[] = Object.values(formData.from);
    const auxArr: string[] = [];
    auxArrMap.map((e: string) => {
      e.length === 1 ? auxArr.push(`0${e}:00`) : auxArr.push(`${e}:00`);
    });
    return auxArr;
  };
  const HastaAux = () => {
    const auxArrMap: string[] = Object.values(formData.to);
    const auxArr: string[] = [];
    auxArrMap.map((e: string) => {
      e.length === 1 ? auxArr.push(`0${e}:00`) : auxArr.push(`${e}:00`);
    });
    return auxArr;
  };

  const parseCentrosToInt=()=>{
    const auxCentros:string[]=formData.centers
    const centrosParseados:number[]=[]
    auxCentros.map((e:string)=>{
      centrosParseados.push(parseInt(e))
    })
    return centrosParseados
  }
  const formDataAdapted = {
    titulo: formData.name,
    descripcion: formData.description,
    imagenesEnBase64: formData.photos,
    usuario_owner: parseInt(userId.toString()),
    categoria_producto: parseInt(formData.category),
    centros_elegidos: parseCentrosToInt(),
    estado_producto: auxState(),
    ubicacion_trade: formData.location,
    dias_elegidos: Object.values(formData.days),
    desde: desdeAux(),
    hasta: HastaAux(),
  };

  await axios
    .post(`${BACK_BASE_URL}CaritasBack/crearPublicacion`, formDataAdapted, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((result: any) => {
      res.status(result.status).json({})
    })
    .catch((result: any) => {
      try {
        res.status(result.status).json({ message: result.data.message })
      } catch {
        res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
      }
    })
}