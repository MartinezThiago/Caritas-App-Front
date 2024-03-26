export type Rol = 'admin_centro' | 'voluntario' | 'usuario_basico'

export type Role = Rol | 'non-registered'

/**
 * The user data.
 * @property {string} userId - The user's ID.
 * @property {string} Nombre - The user's name.
 * @property {string} Apellido - The user's surname.
 * @property {string} DNI - The user's DNI. (Argentinian ID)
 * @property {string} Fecha_Nacimiento - The user's birthdate. Always in timestamp.
 * @property {string} Email - The user's email.
 * @property {Role} Rol - The user's role.
 * @property {number} Centro - The user' center.
 */
export interface User {
  userId:string
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

export type Comment = {
  user_id_pregunta:string
  id_pregunta:string
  nombre_pregunta:string
  apellido_pregunta:string
  pregunta:string
  fechaPregunta:string
  respuesta?:string
  fechaRespuesta?:string
} 

export interface questionBody{
  usuario_owner_pregunta:number
  contenido_pregunta:string 
  fecha_publicacion_pregunta:string 
  idPublicacion:string
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
 * @property {string} id - The post id.
 * @property {string} titutlo - The post title.
 * @property {string} descripcion - The post description.
 * @property {string} nombre_categoria_producto - The product categorie.
 * @property {string} nombre_estado_producto - The product state.
 * @property {string} ubicacion_trade - The post location.
 * @property {number} preguntas - The post questions.
 * @property {number} multimedia - The post multimedia.
 * @property {number} estado_publicacion - The post state.
 * @property {number} fecha_publicacion - The date of the post.
 * @property {string} usuario_owner - The ID of the user who created the post.
 * @property {string} nombre_usuario - The name of the user who created the post.
 * @property {string} apellido_usuario - The last name of the user who created the post.
 * @property {number} centros_elegidos- The post centers.
 * @property {[Comment]} comentarios - The post asks/questions 
 */
export interface PostData {
  id: string
  titulo:string
  descripcion:string
  nombre_categoria_producto:string
  nombre_estado_producto:string
  ubicacion_trade:string
  preguntas:number
  multimedia:number
  estado_publicacion:number
  fecha_publicacion:number
  id_usuario:string
  nombre_usuario:string
  apellido_usuario:string
  centros_elegidos:number
  comentarios:[Comment]
  user:User
}

/*--------------------------------------------------------------------------------------------*/
/**
 * The user data.
 * @property {string} name - The user's name.
 * @property {string} surname - The user's surname.
 * @property {string} dni - The user's DNI. (Argentinian ID)
 * @property {string} birthdate - The user's birthdate. Always in timestamp.
 * @property {string} email - The user's email.
 * @property {Role} role - The user's role.
 * @property {number} center - The user' center.
 */
// export interface User {
//   name: string
//   surname: string
//   dni: string
//   birthdate: string
//   email: string
//   role: Role
//   center:number
// }
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
// export interface UnadaptedUser {
//   Nombre: string
//   Apellido: string
//   DNI: string
//   Email: string
//   Fecha_Nacimiento: string
//   Rol: Role
//   Centro: number
// }

export type img = {
  url_image:string
} 
export interface PostDataGallery {
  id: number
  titulo:string
  descripcion:string
  nombre_categoria_producto:string
  nombre_estado_producto:string
  ubicacion_trade:string
  preguntas:number
  estado_publicacion:number
  fecha_publicacion:number
  usuario_owner:number
  nombre_usuario:string
  apellido_usuario:string
  centros_elegidos:number
  multimedia:[img]
}