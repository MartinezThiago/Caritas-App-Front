import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import { GetSSPropsResult, PostData, PostDataAdapter, UnadaptedCenter, User } from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import profileDefaultPic from 'public/profile-pic-default.jpg'

  export async function getServerSideProps({
    req,
    res
  }: Readonly<{
    req: NextApiRequest
    res: NextApiResponse
  }>): Promise<GetSSPropsResult> {
    return requireNothing(getUser(req, res))
  }
  
export default function PostInfo({ user }: { user: User }){
  
    const router=useRouter();
    const [postData, setPostData] = useState<PostDataAdapter>()
    
  
    useEffect(() => {
        const getProducts = async () => {
        const {data:postData} = await axios.post<PostDataAdapter>(`${FRONT_BASE_URL}post/get`, {id:router.query.id} )
        
        setPostData(postData)       
        }
        getProducts()
    }, [])
    if(!postData){
        return null
    }    

    return( 
        <RootLayout user={user}>
            <ExtendedPostCard
                  idPost={postData.id}
                  title={postData.titulo}
                  description={postData.descripcion}
                  nameProductCategorie={postData.nombre_categoria_producto}
                  nameStateProduct={postData.nombre_estado_producto}
                  locationTrade={postData.ubicacion_trade}
                  question={0}
                  postState={0}
                  postDate={postData.fecha_publicacion}
                  idOwnerUser={postData.id_usuario}
                  nameUser={postData.nombre_usuario}
                  surnameUser={postData.apellido_usuario}
                  comments={postData.comentarios}
                  images={postData.imagenes}
                  user={user}
                  profilePicOwner={postData.base64_imagen}
                  centersChoosed={postData.centros}
                  centersChoosedInfoTrade={postData.centros_Publicacion}
            />
        </RootLayout>
    )
}