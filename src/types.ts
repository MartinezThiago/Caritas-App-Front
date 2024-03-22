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
 * @property {Role} Rol - The user's role.
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

/**
 * The product card data.
 * @property {string} id_post - The product id.
 * @property {string} img_src - The product image URL.
 * @property {number} title - The product title.
 * @property {number} description - The product description.
 * @property {string} categorie - The product categorie.
 * @property {string} state - The product state.
 */
export interface CardProductProps {
  id_post: string
  img_src: string
  title: string
  description: string
  categorie: string
  state: string
}

/**
 * The user data from external server.
 * @property {string} id_user - The user id.
 * @property {string} name - The user name.
 * @property {number} lastname - The user lastname.
 * @property {number} dni - The user dni.
 * @property {string} email - The user email.
 * @property {Role} Rol - The user Rol.
 * @property {number} FechaNacimiento - The user birthday.
 */
export interface UserData {
  id_user: string
  name: string
  lastname: string
  dni: string
  email: string
  Rol: Rol
  FechaNacimiento: number
}

/**
 * The Post data from external server (userdata+postdata).
 * @property {number} id_post - The post id.
 * @property {string} title - The post title.
 * @property {string} description - The post description.
 * @property {number} categorie - The product categorie.
 * @property {number} state_product - The product state.
 * @property {string} location_trade - The post location.
 * @property {number} questions - The post questions.
 * @property {number} multimedia - The post multimedia.
 * @property {number} state_post - The post state.
 * @property {number} date_post - The date of the post.
 * @property {number} id_owner - The ID of the user who created the post.
 * @property {string} owner_name - The name of the user who created the post.
 * @property {string} owner_surname - The last name of the user who created the post.
 * @property {number} centers - The post centers.
 */
export interface PostData {
  id_post: number
  title:string
  description:string
  categorie:number
  state_product:number
  location_trade:string
  questions:number
  multimedia:number
  state_post:number
  date_post:number
  id_owner:number
  owner_name:string
  owner_surname:string
  centers:number
}

