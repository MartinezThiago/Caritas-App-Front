import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import { GetSSPropsResult, PostData, PostDataAdapter, UnadaptedCenter, User } from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";
import CardProduct from "@/components/post-card";
import auxPic from 'public/post-image-preview.jpg'
import Link from "next/link";
import plusPost from 'public/plus-image.png'
import Image from 'next/image'
import { Loading } from "@/components/loading";
export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}

export default function UserPostsFavs({ user }: { user: User }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/favs/getPostFavs`)
        .then((res: any) => {
          setPosts(res.data);
          console.log(res.data);

        })
        .catch((res: any) => {
          try {
            // res.status(res.status).json({ message: res.data.message })
            setPosts([])

          } catch {
            //res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
            setPosts([])
          }
        },
        )
    }
    getPosts()
  }, [])

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
            locationTrade={e.localidad}
            image={
              e.imagenEnBase64
            }
            ownerPost={e.usuario_owner === parseInt(user.userId.toString())}
          />
        )
      })
      return cards
    }
  }
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);
  return (
    <RootLayout user={user}>
      {/* <div className="flex justify-between w-[100vw] mt-[40px]">
        <div className="w-[15vw] border-e-[0.5px] border-blue-900"></div>
        <div className="flex flex-col mt-[20px]">
          <p className="text-xl font-bold text-blue-900  m-auto">
            MIS FAVORITOS
          </p>
            <div>
              {isLoading ?
                <div className="flex">
                  <div className="m-auto">
                    <Loading />
                  </div>
                </div> :
                <div className="flex mt-[40px]">
                  <div className="flex">

                    {CardsProducts()}
                  </div>
                </div>}
            </div>

        </div>
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900"></div>
      </div> */}
      <div className="flex justify-between mt-[40px]">
        <div className="w-[15vw] h-[85vh] border-e-[0.5px] border-blue-900 "></div>
        {isLoading ? (
          <div className="flex mt-[50px]">
            <div className="">
              <Loading />
            </div>
          </div>
        ) :
          <div>
            {(posts.length > 0) ?
              <div>
                <div className="flex flex-col mt-[20px]">
                  <p className="text-xl font-bold text-blue-900  m-auto">
                    MIS FAVORITOS
                  </p>
                  <div className="flex m-auto mt-[20px]">
                    <div className="flex">

                    </div>
                    {CardsProducts()}
                  </div>
                </div>
              </div> : <div className="flex flex-col">
                <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                  NO TIENES PUBLICACIONES EN FAVORITOS
                </p>
                <div className="flex mt-[40px] m-auto">
                </div>
              </div>}
          </div>}
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900"></div>
      </div>
    </RootLayout>
  )
}