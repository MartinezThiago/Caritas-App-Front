import { TradeCardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function TradeOfferProduct(props: TradeCardProductProps) {

  return (
    <Link href={`/posts/${props.idPost}`} className='w-[35%] h-[12rem] border-[3px] rounded-xl border-blue-900 hover:scale-105 duration-300'>
      <div className='flex h-[100%]'>
        <Image className='w-[190px] m-2.5 h-[90%] rounded-tl-xl rounded-bl-xl' width='0' height='0' alt={`post-image-${props.idPost}`} src={props.imagePost} />
        <div className=''>
          <div className='flex content-between justify-between w-full'>
            <div className={'mt-3.5 ms-3.5	w-[50%] '}>
              <p className={'text-2xl font-bold'}>{props.title}</p>
              <h2 className=''>{props.desciption}</h2>
              <div className={'flex justify-center items-center mt-6'}>
                <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
                <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
              </div>

            </div>
            <div className='m-3.5 w-6/12'>
              <p className={'text-2xl w-full font-bold m-auto'}>Centros</p>
              <p className={'text-black mt-[5px] text-sm'}><span className='text-rose-700 font-bold text-base'>{props.centersChoosedInfoTrade.nombre_centro}: </span>57 n1240</p>
              
            </div>
          </div>
          <div className='flex items-center '>
            <p className="font-bold">Creador: </p>
            <div className="flex items-center ms-[20px]">
              <Image
                alt={`ownerPostProfilePic`}
                className={"w-[38px] rounded-full"}
                width={0}
                height={0}
                src={props.profilePic}
              />
              <p className="ms-[5px]">
                {props.name} {props.surname}
              </p>
            </div>
          </div>
        </div>

      </div>

    </Link>
  )
}