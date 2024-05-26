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

export default function UserTradeOffers({ user }: { user: User }) {
  const [tradeOffers, setTradeOffers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getTradeOffers = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/trade-offers/`)
        .then((res: any) => {
          console.log(res.data);

          setTradeOffers(res.data)
        })
    }
    getTradeOffers()
  }, [])

  const CardsTradeOffer = () => {
    if (tradeOffers) {
      const cards = tradeOffers!.map((e: FullOfferTradeCard) => {
        // console.log(e);
        
        return (
          <TradeOfferFull
            //INFORMACION DEL USUARIO QUE RECIBIO LA OFERTA Y SU PUBLICACION
            idUserOwner={e.idUserOwner}
            nameUserOwner={e.nameUserOwner}
            surnameUserOwner={e.surnameUserOwner}
            profilePicUserOwner={e.profilePicUserOwner}
            idPostOwner={e.idPostOwner}
            titlePostOwner={e.titlePostOwner}
            descriptionPostOwner={e.descriptionPostOwner}
            nameProductCategoriePostOwner={e.nameProductCategoriePostOwner}
            nameProductStatePostOwner={e.nameProductStatePostOwner}
            locationTradePostOwner={e.locationTradePostOwner}
            imagePostOwner={e.imagePostOwner}
            //INFORMACION DEL USUARIO QUE OFERTO Y SU PUBLICACION
            idUserOffer={e.idUserOffer}
            nameUserOffer={e.nameUserOffer}
            surnameUserOffer={e.surnameUserOffer}
            profilePicUserOffer={e.profilePicUserOffer}
            idPostOffer={e.idPostOffer}
            titlePostOffer={e.titlePostOffer}
            descriptionPostOffer={e.descriptionPostOffer}
            nameProductCategoriePostOffer={e.nameProductCategoriePostOffer}
            nameProductStatePostOffer={e.nameProductStatePostOffer}
            locationTradePostOffer={e.locationTradePostOffer}
            imagePostOffer={e.imagePostOffer}
            //INFORMACION QUE ELIGIO EL OFERTANTE Centro, hora y fecha
            idCenterPostChoosedTrade={e.idCenterPostChoosedTrade}
            hourCenterPostChoosedTrade={e.hourCenterPostChoosedTrade}
            dateCenterPostChoosedTrade={e.dateCenterPostChoosedTrade}
            nameCenterPostChoosedTrade={e.nameCenterPostChoosedTrade}
            addressCenterPostChoosedTrade={e.addressCenterPostChoosedTrade}
            idOffer={e.idOffer}
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
      <div className="flex w-[100vw] mt-[40px]">
        <div className="m-auto">
        {isLoading ? (
          <div className="flex mt-[50px]">
            <div className="">
              <Loading />
            </div>
          </div>
        ) :
          <div>
            {(tradeOffers.length > 0) ?
              <div>
                <div className="flex flex-col ">
                  {/* <p className="text-xl font-bold text-blue-900  m-auto">
                    MIS FAVORITOS
                  </p> */}
                    {CardsTradeOffer()}

                </div>
              </div> : <div className="flex flex-col">
                <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                  NO TIENES OFERTAS DE INTERCAMBIOS PENDIENTES
                </p>
                <div className="flex mt-[40px] m-auto">
                </div>
              </div>}
          </div>}
        </div>
      </div>
    </RootLayout>
  );
}
