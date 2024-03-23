import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import {
  TokenName,
  User
} from '@/types'
import {
  getCookie,
  setCookie
} from 'cookies-next'

import { decode } from 'jsonwebtoken'

/**
 * Sets the token in a server side cookie
 * @arg {TokenName} name : The name of the cookie
 * @arg {string} token : The token to be set
 * @arg {NextApiRequest} req : The request object
 * @arg {NextApiResponse} res : The response object
 * @arg {Date} [expiresAt] : The date when the token expires
 */
export const setToken = (
  name: TokenName,
  token: string,
  req: NextApiRequest,
  res: NextApiResponse,
  expiresAt?: Date,
): void => {
  const { exp } = decode(token) as { exp: number }
  const date = new Date(exp * 1000)
  setCookie(
    name,
    token,
    {
      req,
      res,
      expires: expiresAt ? expiresAt : date
    }
  )
}

/**
 * Gets the user from the access token in a server side cookie.
 * If the token is not present, returns an empty user object with null role.
 * @arg {NextApiRequest} req : The request object
 * @arg {NextApiResponse} res : The response object
 */
export const getUser = (
  req: NextApiRequest,
  res: NextApiResponse
): User => {
  const token = getCookie('access', { req, res })
  if (token === undefined) return {
    Nombre: '',
    Apellido: '',
    DNI: '-1',
    Fecha_Nacimiento: new Date().getTime().toString(),
    Email: '',
    Rol: 'non-registered',
    Centro:-1
  }
  const user = decode(token) as User  
  return {
    Nombre: user.Nombre,
    Apellido: user.Apellido,
    DNI: user.DNI,
    Fecha_Nacimiento: new Date(user.Fecha_Nacimiento).getTime().toString(),
    Email: user.Email,
    Rol: user.Rol,
    Centro:3
  }
}

/**
 * Gets the token from a server side cookie
 * @arg {NextApiRequest} req : The request object
 * @arg {NextApiResponse} res : The response object
 */
export const authVerify = (
  req: NextApiRequest,
  res: NextApiResponse
): boolean => {
  const token = getCookie('access', { req, res })
  if (token === undefined) return false
  return true
}
