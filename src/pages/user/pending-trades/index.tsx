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
  const [isLoading, setIsLoading] = useState(true);
  const [stylesOption, setStylesOption] = useState(0)
  const statesTrades = ['PENDIENTES', 'RECHAZADOS', 'CONFIRMADOS', 'CANCELADOS']

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
            key={e.idIntercambio}
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
            reasonAction={e.productoDonado}
          />
        )
      })
      cards.sort((a, b) => a.props.tradeState - b.props.tradeState)
      return cards
    }
  }
  const CardsPendingTradesAUX = () => {
    if (pendingTrades) {
      const cards = pendingTrades!.map((e: any) => {
        console.log(e);

        return (
          <PendingTradeCard
            idTrade={e.idIntercambio}
            key={e.idIntercambio}
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
            reasonAction={e.productoDonado}
          />
        )
      })
      cards.sort((a, b) => a.props.tradeState - b.props.tradeState)
      return stylesOption == 0 ? cards : cards.filter(x => x.props.tradeState == stylesOption)
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
          ) : <div>
            {(pendingTrades.length > 0) ?

              <div className="flex mb-[40px]">
                <div className="w-[15vw] h-[85vh] border-e-[0.5px] border-blue-900 mt-[40px]"></div>

                <div className="flex flex-col  w-[75vw] items-center">
                  <p className="text-xl font-semibold text-blue-900  mt-[20px]">
                    INTERCAMBIOS PENDIENTES
                  </p>
                  <div className="mt-[20px]">
                    <button
                      key='all'
                      className=' mx-[10px] hover:text-rose-700 w-[120px] h-[35px] font-semibold  hover:font-semibold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                      style={{
                        fontWeight: stylesOption == 0 ? '700' : '600',
                        color: stylesOption == 0 ? 'rgb(190 18 60)' : '',
                        borderInlineStartWidth: stylesOption == 0 ? '2px' : '0px',
                        borderInlineEndWidth: stylesOption == 0 ? '2px' : '0px',
                        borderColor: stylesOption == 0 ? 'rgb(190 18 60)' : 'white',
                        borderBottomLeftRadius: stylesOption == 0 ? '10px' : '0px',
                        borderBottomRightRadius: stylesOption == 0 ? '10px' : '0px',
                      }}
                      onClick={() => {
                        setStylesOption(0)
                      }}
                    >
                      Todos
                    </button>
                    <button
                      key='pending'
                      className=' mx-[10px] hover:text-rose-700  w-[120px] h-[35px] font-semibold  hover:font-semibold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                      style={{
                        fontWeight: stylesOption == 1 ? '700' : '600',
                        color: stylesOption == 1 ? 'rgb(190 18 60)' : '',
                        borderInlineStartWidth: stylesOption == 1 ? '2px' : '0px',
                        borderInlineEndWidth: stylesOption == 1 ? '2px' : '0px',
                        borderColor: stylesOption == 1 ? 'rgb(190 18 60)' : 'white',
                        borderTopLeftRadius: stylesOption == 1 ? '10px' : '0px',
                        borderTopRightRadius: stylesOption == 1 ? '10px' : '0px',
                      }}
                      onClick={() => {
                        setStylesOption(1)
                      }}
                    >
                      Pendientes
                    </button>
                    <button
                      key='accepted'
                      className=' mx-[10px] hover:text-rose-700  w-[125px] h-[35px] font-semibold  hover:font-semibold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                      style={{
                        fontWeight: stylesOption == 3 ? '700' : '600',
                        color: stylesOption == 3 ? 'rgb(190 18 60)' : '',
                        borderInlineStartWidth: stylesOption == 3 ? '2px' : '0px',
                        borderInlineEndWidth: stylesOption == 3 ? '2px' : '0px',
                        borderColor: stylesOption == 3 ? 'rgb(190 18 60)' : 'white',
                        borderBottomLeftRadius: stylesOption == 3 ? '10px' : '0px',
                        borderBottomRightRadius: stylesOption == 3 ? '10px' : '0px',
                      }}
                      onClick={() => {
                        setStylesOption(3)
                      }}
                    >
                      Confirmados
                    </button>
                    <button
                      key='rejected'
                      className=' mx-[10px] hover:text-rose-700 w-[120px] h-[35px] font-semibold  hover:font-semibold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                      style={{
                        fontWeight: stylesOption == 2 ? '700' : '600',
                        color: stylesOption == 2 ? 'rgb(190 18 60)' : '',
                        borderInlineStartWidth: stylesOption == 2 ? '2px' : '0px',
                        borderInlineEndWidth: stylesOption == 2 ? '2px' : '0px',
                        borderColor: stylesOption == 2 ? 'rgb(190 18 60)' : 'white',
                        borderTopLeftRadius: stylesOption == 2 ? '10px' : '0px',
                        borderTopRightRadius: stylesOption == 2 ? '10px' : '0px',
                      }}
                      onClick={() => {
                        setStylesOption(2)
                      }}
                    >
                      Rechazados
                    </button>
                    <button
                      key='canceled'
                      className=' mx-[10px] hover:text-rose-700 w-[120px] h-[35px] font-semibold  hover:font-semibold  hover:border-rose-700 hover:border-s-[2px] hover:border-e-[2px] text-lg duration-100'
                      style={{
                        fontWeight: stylesOption == 4 ? '700' : '600',
                        color: stylesOption == 4 ? 'rgb(190 18 60)' : '',
                        borderInlineStartWidth: stylesOption == 4 ? '2px' : '0px',
                        borderInlineEndWidth: stylesOption == 4 ? '2px' : '0px',
                        borderColor: stylesOption == 4 ? 'rgb(190 18 60)' : 'white',
                        borderBottomLeftRadius: stylesOption == 4 ? '10px' : '0px',
                        borderBottomRightRadius: stylesOption == 4 ? '10px' : '0px',
                      }}
                      onClick={() => {
                        setStylesOption(4)
                      }}
                    >
                      Cancelados
                    </button>
                  </div>
                  <div className="">
                    {CardsPendingTradesAUX()!.length > 0 ? CardsPendingTradesAUX() :
                      <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">NO TUVISTE INTERCAMBIOS {statesTrades[stylesOption - 1]} AUN 
                      </p>}

                  </div>
                </div>
                <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900 mt-[40px]"></div>
              </div>
              : <div className="flex flex-col">
                <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                  NO HAZ ACEPTADO INTERCAMBIOS AUN
                </p>
                <div className="flex mt-[40px] m-auto">
                </div>
              </div>}
          </div>}
        </div>
        <div className="w-[15vw] h-[85vh] border-s-[0.5px] border-blue-900 mt-[40px]"></div>
      </div>
    </RootLayout>
  );
}
