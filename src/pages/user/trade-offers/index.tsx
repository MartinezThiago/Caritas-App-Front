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
import auxPostPic from 'public/post-image-preview.jpg'
import Link from "next/link";
import plusPost from 'public/plus-image.png'
import Image from 'next/image'
import { Loading } from "@/components/loading";
import { TradeOfferFull, TradeOfferProduct } from "@/components";
import auxProfilePic from 'public/profile-pic-default.jpg'

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}
const center1 = {
  id_cp: 1,
  id_publicacion: 1,
  nombre_centro: 'Centro Y',
  desde: '11:00',
  hasta: '12:00',
  diasDeIntercambio: ['Lunes']
}
const center2 = {
  id_cp: 1,
  id_publicacion: 1,
  nombre_centro: 'Centro Y',
  desde: '14:00',
  hasta: '15:00',
  diasDeIntercambio: ['Lunes', 'Martes']
}
const center3 = {
  id_cp: 1,
  id_publicacion: 1,
  nombre_centro: 'Centro Y',
  desde: '09:00',
  hasta: '10:00',
  diasDeIntercambio: ['Lunes']
}
export default function UserTradeOffers({ user }: { user: User }) {

  return (
    <RootLayout user={user}>

      {/*<h1>TRADE OFFERS</h1>
       <TradeOfferProduct
        centersChoosedInfoTrade={[center1]}
        desciption="Zapatillas negras talle 39."
        idPost={1}
        imagePost={auxPostPic.src}
        nameProductCategorie="nuevo"
        nameProductState="ropa"
        profilePic={auxProfilePic.src}
        name='Thiago'
        surname='Martinez'
        title="Zapatillas"
        key={1}
      /> */}
      <div className="flex w-[100vw]">

        <div className="m-auto">
          <TradeOfferFull />
        </div>
      </div>
    </RootLayout>
  )
}