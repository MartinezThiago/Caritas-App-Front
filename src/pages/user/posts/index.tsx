import ExtendedPostCard from "@/components/extended-post-card";
import { Loading } from "@/components/loading";
import CardProduct from "@/components/post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import { GetSSPropsResult, User } from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Image from "next/image";
import Link from "next/link";
import plusPost from "public/plus-image.png";
import auxPic from "public/post-image-preview.jpg";
import { useEffect, useState } from "react";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}

export default function UserPostsInfo({ user }: { user: User }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/getposts`)
        .then((res: any) => {
          setPosts(res.data);
          console.log(res.data);
        })
        .catch((res: any) => {
          try {
            // res.status(res.status).json({ message: res.data.message })
            setPosts([]);
          } catch {
            //res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
            setPosts([]);
          }
        });
    };
    getPosts();
  }, []);

  const CardsProducts = () => {
    if (posts) {
      const cards = posts!.map((e: any) => {
        return (
          <CardProduct
            key={e.id}
            id={e.id}
            title={e.titulo}
            desciption={e.descripcion}
            nameProductCategorie={e.nombre_categoria_producto}
            nameProductState={e.nombre_estado_producto}
            locationTrade={e.ubicacion_trade}
            image={
              e.imagenes[0].base64_imagen ? e.imagenes[0].base64_imagen : auxPic
            }
            ownerPost={e.usuario_owner === parseInt(user.userId.toString())}
            onMyPost={true}
            statePost={e.estado_publicacion}
          />
        );
      });
      return cards;
    }
  };
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);
  return (
    <RootLayout user={user}>
      <div className="flex justify-between">
        <div className="w-[15vw] h-[85vh] border-e-[0.5px] border-blue-900 mt-[40px]"></div>
        {isLoading ? (
          <div className="flex mt-[50px]">
            <div className="">
              <Loading />
            </div>
          </div>
        ) : (
          <div>
            {posts.length > 0 ? (
              <div className="">
                <div className="flex flex-col ">
                  <p className="text-xl font-semibold text-blue-900 mt-[20px]  m-auto">
                    MIS PUBLICACIONES
                  </p>
                  <div className="w-auto flex flex-wrap justify-center mt-[40px]">
                    <Link
                        href={`/post/create`}
                        className="bg-blue-100 w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[2px] border-blue-900 rounded-tl-[15px] rounded-br-[15px] hover:scale-105 duration-300"
                      >
                        <div className="flex h-[100%] w-[100%]">
                          <Image
                            alt="Crear Publicacion"
                            src={plusPost}
                            width={0}
                            height={0}
                            className="w-[80px] h-[80px] m-auto"
                          />
                        </div>
                      </Link>

                    {CardsProducts()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                  NO TIENES PUBLICACIONES CREADAS
                </p>
                <div className="flex mt-[40px] m-auto">
                  <Link
                    href={`/post/create`}
                    className="bg-blue-100 w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[2px] border-blue-900 rounded-tl-[15px] rounded-br-[15px] hover:scale-105 duration-300"
                  >
                    <div className="flex h-[100%] w-[100%]">
                      <Image
                        alt="Crear Publicacion"
                        src={plusPost}
                        width={0}
                        height={0}
                        className="w-[80px] h-[80px] m-auto"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900 mt-[40px]"></div>
      </div>
    </RootLayout>
  );
}
