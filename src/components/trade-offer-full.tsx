import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"

export default function TradeOfferFull(props: any) {
    console.log(props);

    return (
        <div className="flex w-[100vw]">
            <TradeOfferProduct
                id={props.idPost}
                title={props.title}
                desciption={props.desciption}
                locationTrade={props.locationTrade}
                image={props.image}
                nameProductCategorie={props.nameProductCategorie}
                nameProductState={props.nameProductState}
                key={props.idPost}
            />
            <div className="flex flex-col justify-between items-center my-[20px] mx-[30px]">
                <button
                    key='accept'
                    className='rounded-[10px] w-[180px] h-[35px] text-rose-700  bg-white outline outline-rose-700 font-bold text-lg hover:bg-rose-700 outline-[3px] hover:text-white  duration-200'
                >
                    aceptar
                </button>
                <img className="w-[80px]" src={SwapArrows.src} alt="swap-arrows" />
                <button
                    key='reject'
                    className='rounded-[10px] w-[180px] h-[35px] text-blue-900  bg-white outline outline-blue-900 font-bold text-lg hover:bg-blue-900 outline-[3px] hover:text-white  duration-200'
                >
                    rechazar
                </button>
            </div>
            <TradeOfferProduct
                id={props.idPost}
                title={props.title}
                desciption={props.desciption}
                locationTrade={props.locationTrade}
                image={props.image}
                nameProductCategorie={props.nameProductCategorie}
                nameProductState={props.nameProductState}
                key={props.idPost}
            />

        </div>
    )
}