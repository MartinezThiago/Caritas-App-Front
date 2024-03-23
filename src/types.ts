export type Rol = 'admin_centro' | 'voluntario' | 'usuario_basico'

export type Role = Rol | 'non-registered'

/**
 * The user data.
 * @property {string} Nombre - The user's name.
 * @property {string} Apellido - The user's surname.
 * @property {string} DNI - The user's DNI. (Argentinian ID)
 * @property {string} Fecha_Nacimiento - The user's birthdate. Always in timestamp.
 * @property {string} Email - The user's email.
 * @property {Role} Rol - The user's role.
 * @property {number} Centro - The user' center.
 */
export interface User {
  Nombre: string
  Apellido: string
  DNI: string
  Email: string
  Fecha_Nacimiento: string
  Rol: Role
  Centro:number
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
