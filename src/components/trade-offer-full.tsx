import TradeOfferProduct from "./trade-offer-product";
import SwapArrows from "public/arrows-swap.png"
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'

export default function TradeOfferFull(props: any) {
    console.log(props);
    const center1={
        id_cp: 1,
        id_publicacion: 1,
        nombre_centro: 'Centro Y',
        desde: '11:00',
        hasta: '12:00',
        diasDeIntercambio: ['Lunes']
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
                centersChoosedInfoTrade={[center1]}
                desciption="Zapatillas negras talle 39."
                idPost={1}
                imagePost={auxPostPic.src}
                nameProductCategorie="nuevo"
                nameProductState="ropa"
                profilePic={auxProfilePic.src}
                name='Thiago'
                surname='Martinez'
                title="Zapatillas"
                key={1}
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
                <img className="w-[80px]" src={SwapArrows.src} alt="swap-arrows" />
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
                centersChoosedInfoTrade={[center1]}
                desciption="Zapatillas negras talle 39."
                idPost={1}
                imagePost={auxPostPic.src}
                nameProductCategorie="nuevo"
                nameProductState="ropa"
                profilePic={auxProfilePic.src}
                name='Thiago'
                surname='Martinez'
                title="Zapatillas"
                key={1}
            />

        </div>
    )
}