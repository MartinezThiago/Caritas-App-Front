export type Rol = 'admin_centro' | 'voluntario' | 'usuario_basico'

export type Role = Rol | 'non-registered'


/**
 * The user data.
 * @property {number} userId - The user's ID.
 * @property {string} name - The user's name.
 * @property {string} surname - The user's surname.
 * @property {string} dni - The user's DNI. (Argentinian ID)
 * @property {string} birthdate - The user's birthdate. Always in timestamp.
 * @property {string} email - The user's email.
 * @property {number} [center] - The user's center. Only for volunteers.
 * @property {Role} role - The user's role.
 */
export interface User {
  userId:number
  name: string
  surname: string
  dni: string
  birthdate: string
  email: string
  center?: number
  role: Role
}

/**
 * The user data from external server.
 * @property {number} userId - The user's ID.
 * @property {string} Nombre - The user's name.
 * @property {string} Apellido - The user's surname.
 * @property {string} DNI - The user's DNI. (Argentinian ID)
 * @property {string} FechaNacimiento - The user's birthdate. Always in timestamp.
 * @property {string} Email - The user's email.
 * @property {number} [Centro] - The user's center. Only for volunteers.
 * @property {Role} Rol - The user's role.
 */
export interface UnadaptedUser {
  userId:number
  Nombre: string
  Apellido: string
  Centro: number
  FechaNacimiento: string
  DNI: string
  Email: string
  Rol: Rol
}

export type img = {
  base64_imagen:string
} 

export type TokenName = 'access' | 'refresh'

export interface GetSSPropsResult {
  props: { user: User }
  redirect?: { destination: string }
}

export type Comment = {
  user_id_pregunta:string
  id_pregunta:number
  nombre_pregunta:string
  apellido_pregunta:string
  pregunta:string
  fechaPregunta:string
  respuesta?:string
  fechaRespuesta?:string
  idRespuesta?:number
  idOwnerPost:number
  idCurrentUser:number
  idPost:number
} 

export type CommentUnadapted = {
  fechaPregunta:string
  fechaRespuesta?:string
  id_pregunta:number
  id_respuesta:number
  nombre_pregunta:string
  apellido_pregunta:string
  pregunta:string
  respuesta?:string
  user_id_pregunta:number
  user_id_respuesta?:number
} 


/**
 * The product card data.
 * @property {number} id - The product id.
 * @property {number} multimedia - The product multimedia.
 * @property {string} title - The product title.
 * @property {string} desciption - The product description.
 * @property {string} nameProductCategorie - The product categorie.
 * @property {string} nameProductState - The product state.
 * @property {string} locationTrade - The ubication of the trade
 *  @property {string} image - The first image of the post
 */
export interface CardProductProps {
  id:number
  multimedia:number
  title:string
  desciption:string
  nameProductCategorie:string
  nameProductState:string
  locationTrade:string
  image:string
}

/**
 * The Post data from external server (userdata+postdata).
 * @property {number} idPost - The post id.
 * @property {string} title - The post title.
 * @property {string} description - The post description.
 * @property {string} nameProductCategorie - The product categorie.
 * @property {string} nameStateProduct - The product state.
 * @property {string} locationTrade - The post location.
 * @property {number} question - The post questions.
 * @property {number} postState - The post state.
 * @property {number} postDate - The date of the post.
 * @property {number} idOwnerUser - The ID of the user who created the post.
 * @property {string} nameUser - The name of the user who created the post.
 * @property {string} surnameUser - The last name of the user who created the post.
 * @property {number} centersChoosed- The post centers.
 * @property {User} user - The current user. 
 * @property {[CommentUnadapted]} [comments] - The post asks/questions.
 * @property {[img]} images - The post asks/questions.
 */
export interface PostData {
  idPost: number
  title:string
  description:string
  nameProductCategorie:string
  nameStateProduct:string
  locationTrade:string
  question:number
  postState:number
  postDate:number
  idOwnerUser:number
  nameUser:string
  surnameUser:string
  centersChoosed:number
  user:User
  comments?:[CommentUnadapted]
  images:[img]
}

export interface PostDataAdapter {
  id: number
  titulo:string
  descripcion:string
  nombre_categoria_producto:string
  nombre_estado_producto:string
  ubicacion_trade:string
  preguntas:number
  estado_publicacion:number
  fecha_publicacion:number
  id_usuario:number
  nombre_usuario:string
  apellido_usuario:string
  centros_elegidos:number
  user:User
  comentarios?:[CommentUnadapted]
  imagenes:[img]
}


