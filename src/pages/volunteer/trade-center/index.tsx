import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import {
  FullOfferTradeCard,
  GetSSPropsResult,
  PostData,
  PostDataAdapter,
  UnadaptedCenter,
  User,
} from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";

import { Loading } from "@/components/loading";


import AuditTradeCard from "@/components/audit-trade-card";
import axios from "axios";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}

type TradeCenterInterface = {

  apellidoUsuarioOffer: string
  apellidoUsuarioOwner: string
  direccion: string
  dniOffer: string
  dniOwner: string
  fechaIntercambio: string
  fotoPerfilUsuarioOffer: string
  fotoPerfilUsuarioOwner: string
  fotoPostOffer: string
  fotoPostOwner: string
  horario: string
  idCentro: number
  idCentroElegido: number
  idEstadoIntercambio: number
  idEstadoPublicacion: number
  idIntercambio: number
  idPostOffer: number
  idPostOwner: number
  idUsuarioOffer: number
  idUsuarioOwner: number
  localidad: string
  nombreCentro: string
  nombreUsuarioOffer: string
  nombreUsuarioOwner: string
  productoDonado: string
}

export default function VolunteerTradeSection({ user }: { user: User }) {
  const [tradeCenter, setTradeCenter] = useState<TradeCenterInterface[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);



  useEffect(() => {
    const getTradesCentro = async () => {
      await axios
        .get(`${FRONT_BASE_URL}volunteer/trade-center/`)
        .then((res: any) => {
          console.log(res.data);

          setTradeCenter(res.data)
        })
    }
    getTradesCentro()
  }, [])

  const CardsTradeOffer = () => {
    if (tradeCenter) {
      const cards = tradeCenter!.map((e: TradeCenterInterface) => {
        console.log(e);

        return (
          <AuditTradeCard
            key={e.idIntercambio}
            idTrade={e.idIntercambio}
            nameOwner={e.nombreUsuarioOwner}
            surnameOwner={e.apellidoUsuarioOwner}
            nameOffer={e.nombreUsuarioOffer}
            surnameOffer={e.apellidoUsuarioOffer}
            firstImagePostOwner={e.fotoPostOwner}
            firstImagePostOffer={e.fotoPostOffer}
            profilePicOwner={e.fotoPerfilUsuarioOwner}
            profilePicOffer={e.fotoPerfilUsuarioOffer}
            centerName={e.nombreCentro}
            locationTrade={e.localidad}
            centerAddress={e.direccion}
            tradeDate={e.fechaIntercambio}
            tradeHour={e.horario}
            tradeState={e.idEstadoIntercambio}
            idPostOwner={e.idPostOwner}
            idPostOffer={e.idPostOffer}
            user={user}
            dniOffer={e.dniOffer}
            dniOwner={e.dniOwner}
            auditDescription={e.productoDonado}
          />
        )
      })
      return cards
    }
  }
  return (
    <RootLayout user={user}>
      <div className="flex w-[100vw]">
        <div className="m-auto">
          {isLoading ? (
            <div className="flex mt-[50px]">
              <div className="">
                <Loading />
              </div>
            </div>
          ) :
            // <div>
            //   {true ?
            //     <div>
            //       <div className="flex flex-col">
            //         <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            //           INTERCAMBIOS
            //         </p>
            //         <div className=" mt-[20px]">

            //         </div>
            //       </div>
            //     </div> : <div className="flex flex-col">
            //       <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
            //         NO TIENES OFERTAS DE INTERCAMBIOS PENDIENTES
            //       </p>
            //       <div className="flex mt-[40px] m-auto">
            //       </div>
            //     </div>}
            // </div>
            CardsTradeOffer()
          }
        </div>
      </div>
    </RootLayout>
  );
}
