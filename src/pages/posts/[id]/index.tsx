import ExtendedPostCard from "@/components/extended-post-card";
import { useRouter } from "next/router"

export default function PostInfo(){
    const router=useRouter();
    alert(router.query.id)
    return( 
        <div>
            <ExtendedPostCard
                  id={3}
                  titulo={'Polenta'}
                  descripcion={'Esto es una polenta increible en buen estado'}
                  nombre_categoria_producto={'alimento'}
                  nombre_estado_producto={'usado'}
                  ubicacion_trade={'Buenos Aires, La Plata'}
                  preguntas={0}
                  multimedia={0}
                  estado_publicacion={0}
                  fecha_publicacion={2024-20-3}
                  usuario_owner={1}
                  nombre_usuario={'Thiago'}
                  apellido_usuario={'Martinez'}
                  centros_elegidos={0}
            />
        </div>
    )
}