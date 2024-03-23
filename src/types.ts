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
 * @property {string} id - The product id.
 * @property {number} multimedia - The product multimedia.
 * @property {string} titulo - The product title.
 * @property {string} descripcion - The product description.
 * @property {string} nombre_categoria_producto - The product categorie.
 * @property {string} nombre_estado_producto - The product state.
 * @property {string} ubicacion_trade - The ubication of the trade
 */
export interface CardProductProps {
  id:string
  multimedia:number
  titulo:string
  descripcion:string
  nombre_categoria_producto:string
  nombre_estado_producto:string
  ubicacion_trade:string
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
 * @property {number} id - The post id.
 * @property {string} titutlo - The post title.
 * @property {string} descripcion - The post description.
 * @property {string} nombre_categoria_producto - The product categorie.
 * @property {string} nombre_estado_producto - The product state.
 * @property {string} ubicacion_trade - The post location.
 * @property {number} preguntas - The post questions.
 * @property {number} multimedia - The post multimedia.
 * @property {number} estado_publicacion - The post state.
 * @property {number} fecha_publicacion - The date of the post.
 * @property {number} usuario_owner - The ID of the user who created the post.
 * @property {string} nombre_usuario - The name of the user who created the post.
 * @property {string} apellido_usuario - The last name of the user who created the post.
 * @property {number} centros_elegidos- The post centers.
 */
export interface PostData {
  id: number
  titulo:string
  descripcion:string
  nombre_categoria_producto:string
  nombre_estado_producto:string
  ubicacion_trade:string
  preguntas:number
  multimedia:number
  estado_publicacion:number
  fecha_publicacion:number
  usuario_owner:number
  nombre_usuario:string
  apellido_usuario:string
  centros_elegidos:number
}
