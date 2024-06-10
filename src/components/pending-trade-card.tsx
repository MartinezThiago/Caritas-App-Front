import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import arrowsSwap from 'public/arrows-swap.png'
import { FullOfferTradeCard, User } from "@/types";
import Image from 'next/image'
import CardProduct from "./post-card";
import { FRONT_BASE_URL } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ButtonEnum } from "./types";
import { useState } from "react";
import { CancelPendingTrade } from ".";
import { useForm } from "react-hook-form";
interface FormData {
    motivoCancelacion: string
}

export default function PendingTradeCard({
    idTrade,
    nameOwner,
    surnameOwner,
    nameOffer,
    surnameOffer,
    firstImagePostOwner,
    firstImagePostOffer,
    profilePicOwner,
    profilePicOffer,
    centerName,
    locationTrade,
    centerAddress,
    tradeDate,
    tradeHour,
    tradeState,
    idPostOwner,
    idPostOffer,
    user,
    reasonAction
}: {
    idTrade: number
    nameOwner: string
    surnameOwner: string
    nameOffer: string
    surnameOffer: string
    firstImagePostOwner: string
    firstImagePostOffer: string
    profilePicOwner: string
    profilePicOffer: string
    centerName: string
    locationTrade: string
    centerAddress: string
    tradeDate: string
    tradeHour: string
    tradeState: number
    idPostOwner: number
    idPostOffer: number
    user: User
    reasonAction?: string
}) {
    const router = useRouter();
    const typeStateTrade = ['pendiente', 'rechazado', 'confirmado', 'cancelado'];
    const [cancelPendingTrade, setCancelPendingTrade] = useState(false)
    //console.log(typeStateTrade[tradeState - 1]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        clearErrors,
        resetField
    } = useForm<FormData>()

    const _handleSubmit = async (formData: FormData) => {
        const formDataAux = {
            id_trade: idTrade,
            id_cancelante: parseInt(user.userId.toString()),
            id_post_owner: idPostOwner,
            id_post_offer: idPostOffer,
            motivo_cancelacion: formData.motivoCancelacion
        }
        console.log(formDataAux);
        await axios
            .post(`${FRONT_BASE_URL}user/pending-trades/cancel/`, formDataAux)
            .then(async () => {
                await router.push('/')
                await router.push('/user/pending-trades')
                alert('Cancelacion exitosa de intercambio')
            })
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error)
            })
    }
    const _handleSubmitCancelCancelTrade = async () => {
        setCancelPendingTrade(false)

    }
    const _handleSubmitCancelTrade = async () => {
        setCancelPendingTrade(true)

    }
    return (
        <div className="w-[43vw] border-[1px]  border-blue-900  my-[20px]">
            {typeStateTrade[tradeState - 1] == 'pendiente' ?
                <div className=" flex justify-end">
                    {!cancelPendingTrade ? <button
                        key='cancel-trade'
                        className='border-s-[1px] px-[10px] border-b-[1px] rounded-bl-[8px] border-rose-700 text-rose-700 hover:bg-rose-700  hover:text-white'
                        type={ButtonEnum.BUTTON}
                        onClick={() => {
                            _handleSubmitCancelTrade()
                        }}
                    >
                        <p className=" font-bold mx-[10px] my-[10px] text-sm"> CANCELAR INTERCAMBIO</p>

                    </button>


                        : <></>}
                </div> :
                typeStateTrade[tradeState - 1] == 'rechazado' ?
                    <div className=" flex justify-end">
                        <div className="border-s-[1px] px-[10px] border-b-[1px] rounded-bl-[8px] border-rose-700 bg-rose-700  text-white">
                            <p className=" font-bold mx-[10px] my-[10px] text-sm"> INTERCAMBIO RECHAZADO</p>
                        </div>
                    </div> :
                    typeStateTrade[tradeState - 1] == 'confirmado' ?
                        <div className=" flex justify-end">
                            <div className="border-s-[1px] px-[10px] border-b-[1px] rounded-bl-[8px] border-green-700 bg-green-700  text-white">
                                <p className=" font-bold mx-[10px] my-[10px] text-sm"> INTERCAMBIO CONFIRMADO</p>
                            </div>
                        </div> :
                        <div className=" flex justify-end">
                            <div className="border-s-[1px] px-[10px] border-b-[1px] rounded-bl-[8px] border-rose-700 bg-rose-700  text-white">
                                <p className=" font-bold mx-[10px] my-[10px] text-sm"> INTERCAMBIO CANCELADO</p>
                            </div>
                        </div>
            }

            < div className="flex px-[20px] pb-[20px] ">
                <div className="h-[12rem] flex items-center justify-center">
                    <div className="flex flex-col items-start">
                        <p className="text-rose-700 text-xl font-bold mb-[4px] ">Centro elegido</p>
                        <div className="flex flex-col text-black">
                            <p className="my-[2px]"><span className="font-semibold ">Localidad: </span>{locationTrade}</p>
                            <p className="my-[2px]"><span className="font-semibold ">Nombre: </span>{centerName} </p>
                            <p className="my-[2px]"><span className="font-semibold ">Direccion: </span>{centerAddress}</p>
                            <p className="my-[2px]"><span className="font-semibold ">Dia: </span>{tradeDate}</p>
                            <p className="my-[2px]"><span className="font-semibold ">Hora: </span>{tradeHour}</p>
                        </div>

                    </div>
                    <div className="w-[2px] bg-rose-700 h-[150px] mt-[10px] rounded-[100%] mx-[20px]"></div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col items-start">
                        <div className="w-[180px] h-[180px]">
                            <Image alt='image-post-owner' src={firstImagePostOwner} width={0} height={0} className="w-full h-full rounded-[10px] p-[20px]" />
                        </div>
                        <div className="flex items-center mt-[10px]">
                            <Image alt="profile-pic-owner" src={profilePicOwner} width={0} height={0} className="w-[40px] rounded-full" />
                            <p className="ms-[10px]">{nameOwner} {surnameOwner}</p>
                        </div>
                    </div>
                    <div>
                        <Image alt="trade-image" src={arrowsSwap} width={0} height={0} className="w-[80px] mx-[40px] mb-[40px]" />
                    </div>
                    <div className="flex flex-col items-start ">
                        <div className="w-[180px] h-[180px]">
                            <Image alt='image-post-offer' src={firstImagePostOffer} width={0} height={0} className="w-full h-full rounded-[10px] p-[20px]" />
                        </div>
                        <div className="flex items-center mt-[10px]">
                            <Image alt="profile-pic-offer" src={profilePicOffer} width={0} height={0} className="w-[40px] rounded-full " />
                            <p className="ms-[10px]">{nameOffer} {surnameOffer}</p>
                        </div>
                    </div>
                </div>
            </div>
            {cancelPendingTrade ?
                <form
                    key='cancel-pending-trade-form'
                    noValidate
                    onSubmit={handleSubmit(_handleSubmit)}
                    className=' flex flex-col items-center justify-center h-[100%]'
                >
                    <div className="w-[80%]">
                        <CancelPendingTrade
                            id='motivoCancelacion'
                            label='Motivo de la cancelacion'
                            error={errors.motivoCancelacion}
                            register={register}
                            // registerOptions={{ required: 'Campo requerido' }}
                            setValue={(value: string) => {
                                setValue('motivoCancelacion', value)
                            }}
                            clearError={() => clearErrors('motivoCancelacion')}
                        />
                    </div>
                    <div>
                        <button
                            key='cancel-trade-form-submit-button'
                            type={ButtonEnum.SUBMIT}

                            className='mx-[10px] py-2 px-6 w-[150px] mb-[40px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                        >
                            Enviar
                        </button>
                        <button
                            key='cancel-cancel-trade'
                            type={ButtonEnum.BUTTON}
                            onClick={() => {
                                _handleSubmitCancelCancelTrade()
                            }}

                            className='mx-[10px] py-2 px-6 w-[150px] mb-[40px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                        >
                            Cancelar
                        </button>
                    </div>

                </form >
                :
                <></>
            }
            {
                typeStateTrade[tradeState - 1] != 'pendiente' ?
                    <div className="h-[40px] border-t-[1px] border-blue-900 flex items-center ">
                        {typeStateTrade[tradeState - 1] == 'rechazado' ?
                            <p className="ms-[10px]"><span className="font-bold ">Motivo del rechazo: </span>{reasonAction}</p> :
                            typeStateTrade[tradeState - 1] == 'cancelado' ?
                                <p className="ms-[10px]"><span className="font-bold">Motivo de la cancelacion: </span>{reasonAction}</p> :
                                typeStateTrade[tradeState - 1] == 'confirmado' ?
                                    <p className="ms-[10px]"><span className="font-bold">{reasonAction != ''?'Producto donado: ':'No hubo donacion'} </span>{reasonAction}</p>
                                    :
                                    <></>}
                    </div> :
                    <></>
            }
        </div >
    )
}