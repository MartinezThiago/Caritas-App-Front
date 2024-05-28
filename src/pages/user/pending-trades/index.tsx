import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import {
  GetSSPropsResult,
  PostData,
  PostDataAdapter,
  UnadaptedCenter,
  User,
} from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";
import auxPostPic from "public/post-image-preview.jpg";
import Link from "next/link";
import plusPost from "public/plus-image.png";
import Image from "next/image";
import { Loading } from "@/components/loading";
import auxProfilePic from "public/profile-pic-default.jpg";
import PendingTradeCard from "@/components/pending-trade-card";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}
export default function UserPendingTrades({ user }: { user: User }) {
  const [pendingTrades, setPendingTrades] = useState([]);

  useEffect(() => {
    const getPendingTrades = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/pending-trades`)
        .then((res: any) => {
          setPendingTrades(res.data);

        })
        .catch((res: any) => {
          try {
            // res.status(res.status).json({ message: res.data.message })
            setPendingTrades([])

          } catch {
            //res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
            setPendingTrades([])
          }
        },
        )
    }
    getPendingTrades()
  }, [])

  const CardsPendingTrades = () => {
    if (pendingTrades) {
      const cards = pendingTrades!.map((e: any) => {
        console.log(e);

        return (
          <PendingTradeCard
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
          />
        )
      })
      return cards
    }
  }

  return (
    <RootLayout user={user}>
      <div className="flex ">
        <div className="w-[15vw] h-[85vh] border-e-[0.5px] border-blue-900 mt-[40px]"></div>

        <div className="flex flex-col  w-[75vw] items-center">
          <p className="text-xl font-semibold text-blue-900  mt-[20px]">
            INTERCAMBIOS PENDIENTES
          </p>
          <div className="">
            {CardsPendingTrades()}
            
          </div>
        </div>
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900 mt-[40px]"></div>
      </div>
    </RootLayout>
  );
}
