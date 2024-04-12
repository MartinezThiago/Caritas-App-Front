import { CardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function TradeOfferProduct(props: CardProductProps) {

  return (
    <Link href={`${props.id}`} className='w-[38%] h-[12rem] border-[3px] border-blue-900 rounded-md hover:scale-105 duration-300'>
      <p className='mt-2 ms-2'><span className='font-bold text-blue-900'>Creador:</span><span className='text-black'> Thiago Martinez</span></p>
      <div className='flex h-[80%]'>
        <Image className='w-[190px] m-2.5 h-[90%]' width='0' height='0' alt={`post-image-${props.id}`} src={props.image} />
        <div className='flex w-full'>
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
            <p className={'text-black mt-[5px] text-sm'}><span className='text-rose-700 font-bold text-base'>Centro n°2: </span>57 n1240</p>
            <p className={'text-black mt-[5px] text-sm'}><span className='text-rose-700 font-bold text-base'>Centro n°3: </span>50 y 120 n200</p>
          </div>
        </div>
      </div>
    </Link>
  )
}