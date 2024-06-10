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
  const [centerUser, setCentersUser] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [stylesOption, setStylesOption] = useState(0)
  const statesTrades = ['PENDIENTES', 'RECHAZADOS', 'CONFIRMADOS', 'CANCELADOS']
  useEffect(() => {
    const getCenters = async () => {
      await axios.get(`${FRONT_BASE_URL}centers-user/get`).then((res: any) => {
        setCentersUser(res.data.nombre_centro)
      })
    }
    getCenters()
  }, [])
  useEffect(() => {
    const formData = {
      id_centro: user.center
    }
    const getTradesCentro = async () => {
      await axios
        .post(`${FRONT_BASE_URL}volunteer/trade-center/`, formData)
        .then((res: any) => {
          setTradeCenter(res.data)
        })
    }
    getTradesCentro()
  }, [])

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);
 
  const CardsTradeOfferAUX = () => {
    if (tradeCenter) {
      const cards = tradeCenter!.map((e: TradeCenterInterface) => {
        //  console.log(e);
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
      cards.sort((a, b) => a.props.tradeState - b.props.tradeState)
      return stylesOption == 0 ? cards : cards.filter(x => x.props.tradeState == stylesOption)
    }
  }
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
              {(tradeCenter.length > 0) ?
                <div>
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
                      HISTORIAL DE INTERCAMBIOS EN EL CENTRO <span className="font-bold">{centerUser}</span>
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
                    <div className=" mt-[20px] mb-[100px] flex flex-col items-center">
                      {CardsTradeOfferAUX()!.length > 0 ? CardsTradeOfferAUX() :
                        <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">NO EXISTEN INTERCAMBIOS {statesTrades[stylesOption - 1]} PARA TU CENTRO
                        </p>

                      }

                    </div>
                  </div>
                </div>
                : <div className="flex flex-col">
                  <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
                    EL CENTRO NO TUVO INTERCAMBIOS
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
