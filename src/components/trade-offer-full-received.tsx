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

export default function TradeOfferFullReceived(props: FullOfferTradeCard) {
    //console.log(props);
    const router = useRouter()
    const _handleSubmitAccept = async () => {
        const formAccept = {
            id_post: props.idPostOwner,
            id_oferta: props.idOffer,
            id_centro: props.idRawCenterPostChoosed
        }
        await axios
            .post(`${FRONT_BASE_URL}user/trade-offers/accept`, formAccept)
            .then(async () => {

                await router.push('/user/pending-trades')
                alert('Oferta aceptada')
            })
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error);
                if (error) {
                    alert(error.response.data.message);
                }
            });

    };
    const _handleSubmitDecline = async () => {
        const formDecline = {
            id_post: props.idPostOffer,
            id_oferta: props.idOffer
        }
        await axios
            .post(`${FRONT_BASE_URL}user/trade-offers/decline`, formDecline)
            .then(async () => {
                await router.push('/')
                await router.push('/user/trade-offers')
                alert('Oferta rechazada')
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
                                <p className="my-[2px]"><span className="font-semibold ">Localidad: </span>{props.locationTradePostOwner}</p>
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
                    <div className="flex flex-col justify-between items-center my-[20px] mx-[30px]">
                        <button
                            key='accept'
                            className='rounded-[10px] w-[180px] h-[35px] text-rose-700  bg-white outline outline-rose-700 font-bold text-lg hover:bg-rose-700 outline-[3px] hover:text-white  duration-200'
                            onClick={() => {
                                _handleSubmitAccept()
                            }}
                        >
                            aceptar
                        </button>
                        <Image alt="swap-arrows" width={0} height={0} className="w-[80px]" src={SwapArrows} />
                        <button
                            key='reject'
                            className='rounded-[10px] w-[180px] h-[35px] text-blue-900  bg-white outline outline-blue-900 font-bold text-lg hover:bg-blue-900 outline-[3px] hover:text-white  duration-200'
                            onClick={() => {
                                _handleSubmitDecline()
                            }}
                        >
                            rechazar
                        </button>
                    </div>
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