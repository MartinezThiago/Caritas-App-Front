import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import { FullOfferTradeCard } from "@/types";
import Image from 'next/image'
import CardProduct from "./post-card";
import { FRONT_BASE_URL } from "@/constants";
import axios from "axios";

export default function TradeOfferFull(props: FullOfferTradeCard) {

    const _handleSubmitAccept = async () => {
        const formAccept = {
            idPost: props.idPostOwner,
            idOfferTrade: ''//ACA IRIA EL ID DE INTERCAMBIO
        }
        await axios
            .post(`${FRONT_BASE_URL}user/trade-offers/accept`, formAccept)
            .then(() => {
                console.log('Aceptaste una oferta de intercambio');
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
            idPost: props.idPostOffer,
            idOfferTrade: ''//ACA IRIA EL ID DE INTERCAMBIO
        }
        await axios
            .post(`${FRONT_BASE_URL}user/trade-offers/decline`, formDecline)
            .then(() => {
                console.log('Rechazaste una oferta de intercambio');
            })
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error);
                if (error) {
                    alert(error.response.data.message);
                }
            });


    };
    return (
        <div className="flex w-[100vw]">
            {/* <TradeOfferProduct
                desciption={props.desciptionPostOwner}
                idPost={props.idPostOwner}
                imagePost={props.imagePostOwner}
                nameProductCategorie={props.nameProductCategoriePostOwner}
                nameProductState={props.nameProductStatePostOwner}
                profilePic={props.profilePicUserOwner}
                name={props.nameUserOwner}
                surname={props.surnameUserOwner}
                title={props.titlePostOwner}
                key={props.idPostOwner}
            /> */}
            {/* <CardProduct
                key={props.idPost}
                id={props.idPost}
                title={e.titulo}
                desciption={e.descripcion}
                nameProductCategorie={e.nombre_categoria_producto}
                nameProductState={e.nombre_estado_producto}
                locationTrade={e.localidad}
                image={
                    e.imagenEnBase64
                }
                ownerPost={e.usuario_owner === parseInt(user.userId.toString())}
            /> */}
            <CardProduct
                desciption={props.desciptionPostOwner}
                id={props.idPostOwner}
                image={props.imagePostOwner}
                locationTrade={props.locationTradePostOwner}
                nameProductCategorie={props.nameProductCategoriePostOwner}
                nameProductState={props.nameProductStatePostOwner}
                ownerPost={false}
                title={props.titlePostOwner}
                key={props.idPostOwner}
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
                desciption={props.desciptionPostOffer}
                idPost={props.idPostOffer}
                imagePost={props.imagePostOffer}
                nameProductCategorie={props.nameProductCategoriePostOffer}
                nameProductState={props.nameProductStatePostOffer}
                profilePic={props.profilePicUserOffer}
                name={props.nameUserOffer}
                surname={props.surnameUserOffer}
                title={props.titlePostOffer}
                key={props.idPostOffer}
            />

        </div>
    )
}