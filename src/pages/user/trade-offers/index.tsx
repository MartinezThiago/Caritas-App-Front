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
import { TradeOfferFullMade, TradeOfferFullReceived, TradeOfferProduct } from "@/components";
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
  const [tradeOffersReceived, setTradeOffersReceived] = useState([])
  const [tradeOffersMade, setTradeOffersMade] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [swapOffers, setSwapOffers] = useState(false)
  useEffect(() => {
    const getTradeOffers = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/trade-offers/`)
        .then((res: any) => {
          console.log(res.data);

          setTradeOffersReceived(res.data.ofertasRecibidas)
          setTradeOffersMade(res.data.ofertasRealizadas)
        })
    }
    getTradeOffers()
  }, [])

  const CardsTradeOfferReceived = () => {
    if (tradeOffersReceived) {
      const cards = tradeOffersReceived!.map((e: FullOfferTradeCard) => {
        //console.log(e);
        return (
          <TradeOfferFullReceived
            key={e.idOffer}
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
            idRawCenterPostChoosed={e.idRawCenterPostChoosed}
            offerState={e.offerState}
            locationTradeCenterChoosed={e.locationTradeCenterChoosed}
          />
        )
      })
      return cards
    }
  }

  const CardsTradeOfferMade = () => {
    if (tradeOffersMade) {
      const cards = tradeOffersMade!.map((e: FullOfferTradeCard) => {
        //console.log(e);
        return (
          <TradeOfferFullMade
            key={e.idOffer}
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
            idRawCenterPostChoosed={e.idRawCenterPostChoosed}
            offerState={e.offerState}
            locationTradeCenterChoosed={e.locationTradeCenterChoosed}
          />
        )
      })
      cards.sort((a, b) => a.props.offerState - b.props.offerState)
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
      <div className="flex w-[100vw] justify-between">
        <div className="w-[15vw] h-[85vh] border-e-[0.5px] border-blue-900 mt-[40px]"></div>
        <div className="">
          {isLoading ? (
            <div className="flex mt-[50px]">
              <div className="">
                <Loading />
              </div>
            </div>
          ) :
            <div>
              {(tradeOffersMade.length > 0) || (tradeOffersReceived.length > 0) ?
                <div>
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
                      OFERTAS DE INTERCAMBIO
                    </p>
                    <div className=" mt-[20px]">
                      <div>
                        <div className="flex justify-center mb-[40px]">
                          <button
                            key='received'
                            className=' mx-[10px] hover:rounded-t-[10px] w-[120px] h-[35px] font-semibold  hover:font-bold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                            style={{
                              fontWeight: swapOffers == false ? '700' : '600',
                              color: swapOffers == false ? 'rgb(190 18 60)' : '',
                              borderInlineStartWidth: swapOffers == false ? '2px' : '0px',
                              borderInlineEndWidth: swapOffers == false ? '2px' : '0px',
                              borderColor: swapOffers == false ? 'rgb(190 18 60)' : 'white',
                              borderTopLeftRadius: swapOffers == false ? '10px' : '0px',
                              borderTopRightRadius: swapOffers == false ? '10px' : '0px',
                            }}
                            onClick={() => {
                              setSwapOffers(false)
                            }}
                          >
                            Recibidas
                          </button>
                          <button
                            key='made'
                            className='mx-[10px] hover:rounded-b-[10px] w-[120px] h-[35px] font-semibold  hover:font-bold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                            style={{
                              fontWeight: swapOffers == true ? '700' : '600',
                              color: swapOffers == true ? 'rgb(190 18 60)' : '',
                              borderInlineStartWidth: swapOffers == true ? '2px' : '0px',
                              borderInlineEndWidth: swapOffers == true ? '2px' : '0px',
                              borderColor: swapOffers == true ? 'rgb(190 18 60)' : 'white',
                              borderBottomLeftRadius: swapOffers == true ? '10px' : '0px',
                              borderBottomRightRadius: swapOffers == true ? '10px' : '0px',
                            }}
                            onClick={() => {
                              setSwapOffers(true)
                            }}
                          >
                            Realizadas
                          </button>
                        </div>
                        {!swapOffers ?
                          <div className="flex flex-col items-center">
                            {tradeOffersReceived.length == 0 ?
                              <p className="text-2xl font-bold text-gray-500  m-auto">
                                NO HAZ RECIBIDO OFERTAS AUN
                              </p> :
                              CardsTradeOfferReceived()}
                          </div> :
                          <div className="flex flex-col items-center">
                            {tradeOffersMade.length == 0 ?
                              <p className="text-2xl font-bold text-gray-500  m-auto">
                                NO HAZ HECHO OFERTAS AUN
                              </p> :
                              CardsTradeOfferMade()}
                          </div>}
                      </div>

                    </div>
                  </div>
                </div> :
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                    NO HAZ HECHO/RECIBIDO OFERTAS AUN
                  </p>
                  <div className="flex mt-[40px] m-auto">
                  </div>
                </div>}
            </div>}
        </div>
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900 mt-[40px]"></div>
      </div>
    </RootLayout >
  );
}
