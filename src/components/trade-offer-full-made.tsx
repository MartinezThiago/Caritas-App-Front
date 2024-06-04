import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import { FullOfferTradeCard } from "@/types";
import Image from 'next/image'
import CardProduct from "./post-card";
import { FRONT_BASE_URL } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";

export default function TradeOfferFullMade(props: FullOfferTradeCard) {
    // console.log(props);
    const router = useRouter()
    const typeStateTrade = ['pendiente', 'rechazada', 'confirmada'];
    const capitalizeFirstLetter = (str: string) => {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const _handleSubmitCancel = async () => {
        const formDecline = {
            id_post: props.idPostOffer,
            id_oferta: props.idOffer,
            cancelar: true
        }
        await axios
            .post(`${FRONT_BASE_URL}user/trade-offers/decline`, formDecline)
            .then(async () => {
                await router.push('/')
                await router.push('/user/trade-offers')
                alert('Oferta cancelada')
            })
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error);
                if (error) {
                    alert(error.response.data.message);
                }
            });


    };
    return (
        <div className="">
            <div className="flex justify-center w-[100vw]">
                <div>
                    <div className="h-[12rem] w-[300px] flex items-center justify-center">
                        <div className="flex flex-col items-start">
                            <p className="text-rose-700 text-xl font-bold mb-[4px] ">Centro elegido</p>
                            <div className="flex flex-col text-black">
                                <p className="my-[2px]"><span className="font-semibold ">Localidad: </span>{props.locationTradeCenterChoosed}</p>
                                <p className="my-[2px]"><span className="font-semibold ">Nombre: </span>{props.nameCenterPostChoosedTrade} </p>
                                <p className="my-[2px]"><span className="font-semibold ">Direccion: </span>{props.addressCenterPostChoosedTrade}</p>
                                <p className="my-[2px]"><span className="font-semibold ">Dia y Hora: </span>{props.dateCenterPostChoosedTrade} {props.hourCenterPostChoosedTrade}</p>
                            </div>
                        </div>
                        <div className="w-[2px] bg-rose-700 h-[150px] mt-[10px] rounded-[100%] mx-[20px]"></div>

                    </div>
                </div>
                <div className="flex w-[62vw]">
                    <TradeOfferProduct
                        desciption={props.descriptionPostOwner}
                        idPost={props.idPostOwner}
                        imagePost={props.imagePostOwner}
                        nameProductCategorie={props.nameProductCategoriePostOwner}
                        nameProductState={props.nameProductStatePostOwner}
                        profilePic={props.profilePicUserOwner}
                        name={props.nameUserOwner}
                        surname={props.surnameUserOwner}
                        title={props.titlePostOwner}
                        key={`${props.idPostOwner} ${props.idOffer} ${props.idPostOffer}`}
                        location={props.locationTradePostOwner}
                    />
                    {typeStateTrade[props.offerState - 1] == 'pendiente' ?
                        <div className="flex flex-col justify-between items-center my-[20px] mx-[30px] h-[80%]">
                            <div className="">
                                {typeStateTrade[props.offerState - 1] == 'pendiente' ? <p className=" bg-gray-500 text-white py-[2px] px-[6px] rounded-[5px] font-semibold">{capitalizeFirstLetter(typeStateTrade[props.offerState - 1])}</p> : <></>}
                            </div>
                            <Image
                                alt="swap-arrows"
                                width={0}
                                height={0}
                                className=" w-[80px]"
                                src={SwapArrows}
                            />
                            {typeStateTrade[props.offerState - 1] == 'pendiente' ? <button
                                key='accept'
                                className='text-white rounded-[10px] w-[160px] ms-2 py-2.5 px-2.5 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                                onClick={() => {
                                    _handleSubmitCancel()
                                }}
                            >
                                Cancelar oferta
                            </button> : <></>}
                        </div> :
                        <div className="flex flex-col justify-between items-center my-[20px] mx-[30px] h-[55%]">
                            <div className="">
                                {typeStateTrade[props.offerState - 1] == 'confirmada' ? <p className="bg-green-700 text-white py-[2px] px-[6px] rounded-[5px] font-semibold">{typeStateTrade[props.offerState - 1]}</p> :
                                    <p className="bg-rose-700 text-white py-[2px] px-[6px] rounded-[5px] font-semibold">{capitalizeFirstLetter(typeStateTrade[props.offerState - 1])}</p>}
                            </div>
                            <Image
                                alt="swap-arrows"
                                width={0}
                                height={0}
                                className=" w-[200px]"
                                src={SwapArrows}
                            />

                        </div>}

                    <TradeOfferProduct
                        desciption={props.descriptionPostOffer}
                        idPost={props.idPostOffer}
                        imagePost={props.imagePostOffer}
                        nameProductCategorie={props.nameProductCategoriePostOffer}
                        nameProductState={props.nameProductStatePostOffer}
                        profilePic={props.profilePicUserOffer}
                        name={props.nameUserOffer}
                        surname={props.surnameUserOffer}
                        title={props.titlePostOffer}
                        key={`${props.idPostOffer} ${props.idOffer} ${props.idPostOwner}`}
                        location={props.locationTradePostOffer}
                    />

                </div>

            </div>
            <div className="w-[70vw] h-[2px] bg-rose-700 m-auto my-[40px] rounded-[50%]"></div>
        </div>
    )
}