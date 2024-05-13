import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

import axios from 'axios'

import { BACK_BASE_URL } from '@/constants'

/**
 * Async handler function that sends the signup form data to the external server.
 * Filters the response and retrieves the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const formData = req.body

  console.log('data', formData)
  debugger

  const adaptedFormData={
    nombre:formData.name,
    apellido:formData.surname,
    dni:formData.dni,
    email:formData.email,
    password:formData.password,
    fecha_nacimiento:formData.birthdate
  }
  
  await axios
    .post(`${BACK_BASE_URL}CaritasBack/registrarUsuario`, adaptedFormData)
    .then((result: any) => {res.status(result.status).json({})})
    .catch((result: any) => {
      try {
        res.status(result.status).json({ message: result.data.message })
      } catch {
        res.status(500).json({ message: 'Ah ocurrido un error inesperado al registrar un usuario.' })
      }
    },
    )
}
