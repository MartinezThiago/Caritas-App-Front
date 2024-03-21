export type Rol = 'SuperAdmin' | 'Voluntario' | 'Nominal'

export type Role = Rol | 'non-registered'

/**
 * The user data.
 * @property {string} name - The user's name.
 * @property {string} surname - The user's surname.
 * @property {number} dni - The user's DNI. (Argentinian ID)
 * @property {number} birthdate - The user's birthdate. Always in timestamp.
 * @property {string} email - The user's email.
 * @property {number} [center] - The user's center. Only for volunteers.
 * @property {Role} role - The user's role.
 */
export interface User {
  name: string
  surname: string
  dni: number
  birthdate: number
  email: string
  center?: number
  role: Role
}

/**
 * The user data from external server.
 * @property {string} Nombre - The user's name.
 * @property {string} Apellido - The user's surname.
 * @property {number} DNI - The user's DNI. (Argentinian ID)
 * @property {number} FechaNacimiento - The user's birthdate. Always in timestamp.
 * @property {string} Email - The user's email.
 * @property {number} [Centro] - The user's center. Only for volunteers.
 * @property {Role} Rik - The user's role.
 */
export interface UnadaptedUser {
  Nombre: string
  Apellido: string
  Centro: number
  FechaNacimiento: number
  DNI: number
  Email: string
  Rol: Rol
}

export type TokenName = 'access' | 'refresh'

export interface GetSSPropsResult {
  props: { user: User }
  redirect?: { destination: string }
}
