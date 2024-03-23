import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import { PostData } from "@/types";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
interface idPost {
    id: string
  }
export default function PostInfo(){
    const router=useRouter();
    const [postData, setPostData] = useState<PostData>()

    useEffect(() => {
        const getProducts = async () => {
        const {data:postData} = await axios.post<PostData>(`${FRONT_BASE_URL}post/get`, {id:router.query.id} )
        setPostData(postData)
        console.log(postData);
        
        }
        getProducts()
    }, [])
    if(!postData){
        return null
    }
      
    return( 
        <div>
            <ExtendedPostCard
                  id={postData.id}
                  titulo={postData.titulo}
                  descripcion={postData.descripcion}
                  nombre_categoria_producto={postData.nombre_categoria_producto}
                  nombre_estado_producto={postData.nombre_estado_producto}
                  ubicacion_trade={postData.ubicacion_trade}
                  preguntas={0}
                  multimedia={0}
                  estado_publicacion={0}
                  fecha_publicacion={postData.fecha_publicacion}
                  usuario_owner={postData.usuario_owner}
                  nombre_usuario={postData.nombre_usuario}
                  apellido_usuario={postData.apellido_usuario}
                  centros_elegidos={0}
            />
        </div>
    )
}