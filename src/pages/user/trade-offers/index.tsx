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
import CardProduct from "@/components/post-card";
import auxPostPic from "public/post-image-preview.jpg";
import Link from "next/link";
import plusPost from "public/plus-image.png";
import Image from "next/image";
import { Loading } from "@/components/loading";
import { TradeOfferFull, TradeOfferProduct } from "@/components";
import auxProfilePic from "public/profile-pic-default.jpg";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}
// const center1 = {
//   id_cp: 1,
//   id_publicacion: 1,
//   nombre_centro: 'Centro Y',
//   desde: '11:00',
//   hasta: '12:00',
//   diasDeIntercambio: ['Lunes']
// }
// const center2 = {
//   id_cp: 1,
//   id_publicacion: 1,
//   nombre_centro: 'Centro Y',
//   desde: '14:00',
//   hasta: '15:00',
//   diasDeIntercambio: ['Lunes', 'Martes']
// }
// const center3 = {
//   id_cp: 1,
//   id_publicacion: 1,
//   nombre_centro: 'Centro Y',
//   desde: '09:00',
//   hasta: '10:00',
//   diasDeIntercambio: ['Lunes']
// }
export default function UserTradeOffers({ user }: { user: User }) {
  return (
    <RootLayout user={user}>
      <div className="flex w-[100vw]">
        <div className="m-auto">
          <TradeOfferFull
            //INFORMACION DEL USUARIO QUE RECIBIO LA OFERTA Y SU PUBLICACION
            idUserOwner={68}
            nameUserOwner="Thiago"
            surnameUserOwner="Martinez"
            profilePicUserOwner={auxProfilePic.src}
            idPostOwner={66}
            titlePostOwner="Buzo"
            desciptionPostOwner="Esto es un buzo xxl"
            nameProductCategoriePostOwner="ropa"
            nameProductStatePostOwner="usado"
            locationTradePostOwner="Buenos Aires, La Plata"
            imagePostOwner={auxPostPic.src}
            //INFORMACION DEL USUARIO QUE OFERTO Y SU PUBLICACION
            idUserOffer={69}
            nameUserOffer="Nicolas"
            surnameUserOffer="Mele"
            profilePicUserOffer={auxProfilePic.src}
            idPostOffer={68}
            titlePostOffer="Zapatillas"
            desciptionPostOffer="Zapatillas negras talle 39"
            nameProductCategoriePostOffer="ropa"
            nameProductStatePostOffer="nuevo"
            locationTradePostOffer="Buenos Aires, La Plata"
            imagePostOffer={auxPostPic.src}
            //INFORMACION QUE ELIGIO EL OFERTANTE Centro, hora y fecha
            idCenterPostChoosedTrade={54}
            hourCenterChoosedTrade="17:00"
            dateCenterChooseTrade="27/06/2024"
            nameCenterChoosedTrade="Centro X"
            addressCenterChoosedTrade="120 y 50 n13"
          />
        </div>
      </div>
    </RootLayout>
  );
}
