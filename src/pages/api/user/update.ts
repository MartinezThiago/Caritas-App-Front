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
    const formData=req.body
    const formDataAdapted={
      nombre:formData.name,
      apellido:formData.surname,
      Fecha_Nacimiento:formData.birthdate,
      dni:formData.dni,
      password:formData.password,
      foto:formData.photo[0]?formData.photo[0]:"",
      centros_elegidos:formData.centers
    }
    console.log(formDataAdapted);
    
    // await axios
    //   .get(`${BACK_BASE_URL}CaritasBack/getPublicacion?idPublicacion=${body.id}`)
    //   .then((result: any) => {                
    //     res.status(result.status).json(result.data)      
    //   },
    //   )
    //   .catch((result: any) => {
    //     try {
    //       res.status(result.status).json({ message: result.data.message })
    //     } catch {
    //       res.status(500).json({ message: 'Ah ocurrido un error inesperado.' })
    //     }
    //   },
    //   )
  }
  