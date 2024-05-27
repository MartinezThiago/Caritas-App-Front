import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import arrowsSwap from 'public/arrows-swap.png'
import { FullOfferTradeCard } from "@/types";
import Image from 'next/image'
import CardProduct from "./post-card";
import { FRONT_BASE_URL } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";

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
    tradeState

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
}) {

    return (
        <div className="w-[43vw] border-[1px]  border-blue-900  my-[20px]">
            <div className=" flex justify-end">
                <p className="text-rose-700 font-bold mx-[10px] my-[10px]"> CANCELAR INTERCAMBIO❌</p>
            </div>
            <div className="flex px-[20px] pb-[20px] ">
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
        </div>
    )
}