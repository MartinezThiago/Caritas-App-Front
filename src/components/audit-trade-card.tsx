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
import { DeclineTradeOptions, Input, TextArea } from ".";
import { FieldError, useForm } from 'react-hook-form'
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from 'lucide-react'


interface FormData {
    motivoRechazo?: string
    productoDonado?: string
}

export default function AuditTradeCard({
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
    dniOffer,
    dniOwner,
    auditDescription
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
    dniOffer: string
    dniOwner: string
    auditDescription:string
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        clearErrors,
        resetField
    } = useForm<FormData>()

    const [loading, setLoaging] = useState(false)
    const [optionTrade, setOptionTrade] = useState('')
    const typeStateAuditTrade = ['pendiente', 'rechazado', 'confirmado', 'cancelado'];

    const _handleDeclineTrade = async () => {
        resetField('productoDonado')
        setOptionTrade('RECHAZAR')

    }
    const _handleConfirmTrade = async () => {
        resetField('motivoRechazo')
        setOptionTrade('CONFIRMAR')

    }


    /**
  * Calls the endpoint by sending it the form data
  * @arg {FormData} formData
  */
    const _handleSubmit = async (formData: FormData) => {
        if ((optionTrade == 'RECHAZAR') && (formData.motivoRechazo == undefined)) {
            alert('Tienes que seleccionar el motivo correspondiente')
            return
        }
        resetField('productoDonado')
        resetField('motivoRechazo')

        const auxDonatedProduct = formData.productoDonado == undefined ? '' : formData.productoDonado
        const formDataAdapted = {
            action: optionTrade,
            str: optionTrade == 'CONFIRMAR' ? auxDonatedProduct : formData.motivoRechazo
        }
        console.log(formDataAdapted);
    }
    //Funcion para agregar puntos al formato de un documento
    function formatString(input: string) {
        // Insert a period after the first two characters
        let formatted = input.slice(0, 2) + '.' + input.slice(2);

        // Regular expression to insert a period every three characters after the initial period
        formatted = formatted.replace(/(\d{3})(?=\d)/g, '$1.');

        return formatted;
    }
    return (
        <div className="flex mt-[20px]">
            <div className="w-[35vw] ">
                <div className="bg-blue-900 w-[100%] h-[40px] flex justify-center items-center">
                    <p className=" text-white "><span className="font-semibold ">Fecha: </span>{tradeDate} | <span className="font-semibold ">Hora: </span>{tradeHour}</p>
                </div>
                <div className="flex px-[20px] pb-[20px] border-[1px] border-blue-900">
                    <div className="w-[100%] flex justify-center">
                        <div className="flex items-center">
                            <div className="flex flex-col items-start">
                                <div className="w-[180px] h-[180px]">
                                    <Image alt='image-post-owner' src={firstImagePostOwner} width={0} height={0} className="w-full h-full rounded-[10px] p-[20px]" />
                                </div>
                                <div className="flex items-center mt-[10px]">
                                    <Image alt="profile-pic-owner" src={profilePicOwner} width={0} height={0} className="w-[40px] rounded-full" />
                                    <div className="ms-[10px]">
                                        <p>{nameOwner} {surnameOwner}</p>
                                        <p className="text-sm text-gray-700"><span className="font-semibold text-base">DNI: </span>
                                            {formatString(dniOwner)}</p>
                                    </div>
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
                                    <div className="ms-[10px]">
                                        <p>{nameOffer} {surnameOffer}</p>
                                        <p className="text-sm text-gray-700"><span className="font-semibold text-base">DNI: </span>
                                            {formatString(dniOffer)}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {typeStateAuditTrade[tradeState - 1] == 'pendiente' ? <div className="flex justify-end">
                    <div className="flex bg-white h-[40px]">
                        <button
                            key='confirm-trade'
                            className='w-[150px] bg-blue-900 rounded-bl-[10px] text-white hover:bg-white hover:text-blue-900 border-s-[1px] border-b-[1px] border-blue-900 hover:border-s-[1px] hover:border-b-[1px] hover:border-blue-900'
                            type={ButtonEnum.BUTTON}
                            onClick={() => {
                                _handleConfirmTrade()
                            }}
                        >
                            <p className=" font-bold px-[10px] py-[10px] text-sm"> CONFIRMAR</p>
                        </button>
                        <button
                            key='decline-trade'
                            className='w-[150px] text-sm  bg-rose-700 text-white hover:bg-white hover:text-rose-700  border-b-[1px] border-e-[1px] border-rose-700  hover:border-b-[1px] hover:border-rose-700 '
                            type={ButtonEnum.BUTTON}
                            onClick={() => {
                                _handleDeclineTrade()
                            }}
                        >
                            <p className=" font-bold mx-[10px] my-[10px] "> RECHAZAR</p>
                        </button>
                    </div>
                </div> : typeStateAuditTrade[tradeState - 1] == 'rechazado' ? 
                <div className="h-[40px] w-[100%] border-b-[1px] border-x-[1px] border-blue-900 flex items-center">
                    <p className="ms-[10px] text-sm"><span className="font-semibold text-base">Motivo del rechazo: </span> {auditDescription}</p>
                </div> : 
                <div className="h-[40px] w-[100%] border-b-[1px] border-x-[1px] border-blue-900 flex items-center">
                    <p className="ms-[10px] text-sm"><span className="font-semibold text-base">{auditDescription != ''? 'Producto donado: ': 'No tuvo donacion'} </span> {auditDescription}</p>
                    </div>}
            </div>
            {optionTrade != '' ? <div className="w-[2px] bg-rose-700 h-[250px] rounded-[100%] mx-[30px] m-auto mt-[20px]"></div> : <></>}
            <div>
                <form
                    key='decline-trade-form'
                    noValidate
                    onSubmit={handleSubmit(_handleSubmit)}
                    className=' flex flex-col items-center justify-center h-[100%]'
                >
                    {optionTrade == 'CONFIRMAR' ? <div className='flex flex-col justify-between content-between h-[100%]'>
                        <div className='w-[500px] '>
                            {/* <Input
                                id='donated-product'
                                register={register}
                                type='text'
                                key='donated-product'
                                // registerOptions={{ required: 'Escriba una pregunta' }}
                                error={errors.productoDonado}
                                placeholder='Escriba aquí el producto donado'
                                label={'Agregar producto donado'}
                            /> */}
                            <TextArea
                                id='productoDonado'
                                label='Agregar producto donado'
                                placeholder="Escriba aquí el producto donado"
                                error={errors.productoDonado}
                                register={register}
                            // registerOptions={{ required: 'Campo requerido' }}
                            />
                        </div>
                        <button
                            key='signin-form-submit-button'
                            type={ButtonEnum.SUBMIT}
                            className='py-2 px-6 w-[150px] mb-[40px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                        >
                            Enviar
                        </button>
                    </div> : optionTrade == 'RECHAZAR' ?
                        <div className="flex flex-col justify-between content-between h-[100%]">
                            <div className="w-[500px]">
                                <DeclineTradeOptions
                                    id='motivoRechazo'
                                    label='Motivo de rechazo'
                                    error={errors.motivoRechazo}
                                    register={register}
                                    // registerOptions={{ required: 'Campo requerido' }}
                                    setValue={(value: string) => {
                                        setValue('motivoRechazo', value)
                                    }}
                                    clearError={() => clearErrors('motivoRechazo')}
                                />
                            </div>
                            <button
                                key='signin-form-submit-button'
                                type={ButtonEnum.SUBMIT}

                                className='py-2 px-6 w-[150px] mb-[40px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                            >
                                Enviar
                            </button>
                        </div> : <></>}

                </form>
            </div>

        </div>
    )
}