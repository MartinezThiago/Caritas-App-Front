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
    user
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
    tradeState: string
    idPostOwner: number
    idPostOffer: number
    user: User

}) {
    const _handleDeclineTrade = async () => {
        console.log('RECHAZADO')


    }
    const _handleConfirmTrade = async () => {
        console.log('CONFIRMADO')


    }
    return (
        <div className="w-[35vw] my-[20px]">
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
                                        42.675.160</p>
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
                                        42.675.160</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
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
            </div>
        </div>
    )
}