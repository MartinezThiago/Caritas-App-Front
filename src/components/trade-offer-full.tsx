import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import { FullOfferTradeCard } from "@/types";
import Image from 'next/image'

export default function TradeOfferFull(props: FullOfferTradeCard) {
    console.log(props);
    const center1={
        id_cp: props.idCenterPostChoosedTrade,
        id_publicacion: props.idPostOffer,
        nombre_centro: props.nameCenterChoosedTrade,
        desde: props.hourCenterChoosedTrade,
        hasta: props.hourCenterChoosedTrade,
        diasDeIntercambio: [props.dateCenterChooseTrade]
        
      }
      const _handleSubmitAccept = async () => {
    
        console.log('ACEPTADO');
    
      };
      const _handleSubmitDecline = async () => {
    
        console.log('RECHAZADO');
    
      };
    return (
        <div className="flex w-[100vw]">
            <TradeOfferProduct
                centersChoosedInfoTrade={center1}
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
            />
            <div className="flex flex-col justify-between items-center my-[20px] mx-[30px]">
                <button
                    key='accept'
                    className='rounded-[10px] w-[180px] h-[35px] text-rose-700  bg-white outline outline-rose-700 font-bold text-lg hover:bg-rose-700 outline-[3px] hover:text-white  duration-200'
                    onClick={()=>{
                        _handleSubmitAccept()
                    }}
                >
                    aceptar
                </button>
                <Image alt="swap-arrows" width={0} height={0} className="w-[80px]" src={SwapArrows} />
                <button
                    key='reject'
                    className='rounded-[10px] w-[180px] h-[35px] text-blue-900  bg-white outline outline-blue-900 font-bold text-lg hover:bg-blue-900 outline-[3px] hover:text-white  duration-200'
                    onClick={()=>{
                        _handleSubmitDecline()
                    }}
                >
                    rechazar
                </button>
            </div>
            <TradeOfferProduct
                centersChoosedInfoTrade={center1}
                desciption={props.desciptionPostOffer}
                idPost={props.idPostOffer}
                imagePost={auxPostPic.src}
                nameProductCategorie={props.nameProductCategoriePostOffer}
                nameProductState={props.nameProductStatePostOffer}
                profilePic={auxProfilePic.src}
                name={props.nameUserOffer}
                surname={props.surnameUserOffer}
                title={props.titlePostOffer}
                key={props.idPostOffer}
            />

        </div>
    )
}