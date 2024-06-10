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
  userId: number
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
 * @property {string} Fecha_Nacimiento - The user's birthdate. Always in timestamp.
 * @property {string} Email - The user's email.
 * @property {number} [Centro] - The user's center. Only for volunteers.
 * @property {Role} Rol - The user's role.
 */
export interface UnadaptedUser {
  userId: number
  Nombre: string
  Apellido: string
  Centro: number
  Fecha_Nacimiento: string
  DNI: string
  Email: string
  Rol: Rol
}

/**
 * The center data from external server.
 * @property {number} id_centro - The center ID.
 * @property {string} nombre_centro - The center name.
 * @property {string} ubicacion - The center location.
 * @property {string} direccion - The center address.
 * @property {string} horario_apertura - The center openingTime.
 * @property {string} horario_cierre - The center closingTime
 * @property {[string]} [dias] - The center work days.
 */
export interface UnadaptedCenter {
  id_centro: number
  nombre_centro: string
  ubicacion: string
  direccion: string
  horario_apertura: string
  horario_cierre: string
  dias: days[]
}
export type days = {
  idDia: number
  descripcion: string
}
export interface UnadaptedCenterPublicacion {
  id_cp: number
  id_publicacion: number
  nombre_centro: string
  desde: string
  hasta: string
  diasDeIntercambio: string[]
}
export type img = {
  base64_imagen: string
}

export type TokenName = 'access' | 'refresh'

export interface GetSSPropsResult {
  props: { user: User }
  redirect?: { destination: string }
}

export type Comment = {
  user_id_pregunta: string
  id_pregunta: number
  nombre_pregunta: string
  apellido_pregunta: string
  pregunta: string
  fechaPregunta: string
  respuesta?: string
  fechaRespuesta?: string
  idRespuesta?: number
  idOwnerPost: number
  idCurrentUser: number
  idPost: number
}

export type CommentUnadapted = {
  fechaPregunta: string
  fechaRespuesta?: string
  id_pregunta: number
  id_respuesta: number
  nombre_pregunta: string
  apellido_pregunta: string
  pregunta: string
  respuesta?: string
  user_id_pregunta: number
  user_id_respuesta?: number
}

/**
 * The trade card data.
 * @property {number} idPost - The product id.
 * @property {string} title - The product title.
 * @property {string} desciption - The product description.
 * @property {string} nameProductCategorie - The product categorie.
 * @property {string} nameProductState - The product state.
 * @property {string} image - The first image of the post
 * @property {string} profilePic - The profile pic image of the post
 * @property {[UnadaptedCenterPublicacion]} centersChoosedInfoTrade- The post centers.
 */
export interface TradeCardProductProps {
  idPost: number
  title: string
  desciption: string
  nameProductCategorie: string
  nameProductState: string
  imagePost: string
  profilePic: string
  name:string
  surname:string
  location:string
}

export interface FullOfferTradeCard {
  //INFORMACION DEL USUARIO QUE RECIBIO LA OFERTA Y SU PUBLICACION
  idUserOwner: number
  nameUserOwner: string
  surnameUserOwner: string
  profilePicUserOwner: string
  idPostOwner: number
  titlePostOwner: string
  descriptionPostOwner: string
  nameProductCategoriePostOwner: string
  nameProductStatePostOwner: string
  locationTradePostOwner: string
  imagePostOwner: string

  //INFORMACION DEL USUARIO QUE OFERTO Y SU PUBLICACION
  idUserOffer: number
  nameUserOffer: string
  surnameUserOffer: string
  profilePicUserOffer: string
  idPostOffer: number
  titlePostOffer: string
  descriptionPostOffer: string
  nameProductCategoriePostOffer: string
  nameProductStatePostOffer: string
  locationTradePostOffer: string
  imagePostOffer: string

  //INFORMACION QUE ELIGIO EL OFERTANTE Centro, hora y fecha
  idCenterPostChoosedTrade:number
  idRawCenterPostChoosed:number
  nameCenterPostChoosedTrade:string
  addressCenterPostChoosedTrade:string
  hourCenterPostChoosedTrade:string
  dateCenterPostChoosedTrade:string

  idOffer:number
  offerState:number

  locationTradeCenterChoosed:string
}


/**
 * The product card data.
 * @property {number} id - The product id.
 * @property {string} title - The product title.
 * @property {string} desciption - The product description.
 * @property {string} nameProductCategorie - The product categorie.
 * @property {string} nameProductState - The product state.
 * @property {string} locationTrade - The ubication of the trade
 * @property {string} image - The first image of the post
 */
export interface CardProductProps {
  id: number
  title: string
  desciption: string
  nameProductCategorie: string
  nameProductState: string
  locationTrade: string
  image: string
  ownerPost: boolean
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
 * @property {[UnadaptedCenter]} centersChoosed- The post centers.
 * @property {[UnadaptedCenterPublicacion]} centersChoosedInfoTrade- The post centers.
 * @property {User} user - The current user.
 * @property {string} profilePicOwner - The profile pic of the owners post
 * @property {[CommentUnadapted]} [comments] - The post asks/questions.
 * @property {[img]} images - The post asks/questions.
 *
 */
export interface PostData {
  idPost: number
  title: string
  description: string
  nameProductCategorie: string
  nameStateProduct: string
  locationTrade: string
  question: number
  postState: number
  postDate: number
  idOwnerUser: number
  nameUser: string
  surnameUser: string
  user: User
  profilePicOwner: string
  comments?: [CommentUnadapted]
  images: [img]
  centersChoosed: [UnadaptedCenter]
  centersChoosedInfoTrade: [UnadaptedCenterPublicacion]
}

export interface PostDataAdapter {
  id: number
  titulo: string
  descripcion: string
  nombre_categoria_producto: string
  nombre_estado_producto: string
  ubicacion_trade: string
  preguntas: number
  estado_publicacion: number
  fecha_publicacion: number
  id_usuario: number
  nombre_usuario: string
  apellido_usuario: string
  centros: [UnadaptedCenter]
  centros_Publicacion: [UnadaptedCenterPublicacion]
  user: User
  comentarios?: [CommentUnadapted]
  base64_imagen: string
  imagenes: [img]
}

export const productStatus = ['Nuevo', 'Usado']
