import { CardProductProps } from '@/types'
import postImagePreview from 'public/post-image-preview.jpg'
import Link from 'next/link'
import Image from 'next/image'

export default function TradeOfferProduct(props: CardProductProps) {
  return (
    <Link href={`posts/${props.id}`} className='flex w-[40rem] h-[13rem] me-[1rem] mb-[1rem] border-[3px] border-blue-900 rounded-md hover:scale-105 duration-300'>
      <Image className='w-[190px] m-2.5 h-[90%]' alt={`post-image-${props.id}`} src={postImagePreview} />
      <div className='flex w-full'>
        <div className={'m-3.5 w-6/12	'}>
          <p className={'text-2xl font-bold'}>{props.title}</p>
          <h2>{props.desciption}</h2>
          <div className={'flex justify-center items-center mt-12'}>
            <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
            <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameStateProduct}</p>
          </div>
          <p className='mt-4'><span className='font-bold text-blue-900'>Creador:</span><span className='text-black'> Thiago Martinez</span></p>
        </div>
        <div className='m-3.5 w-6/12'>
          <p className={'text-2xl w-full font-bold ms-[25%]'}>Centros</p>
          <p className={'text-black mt-[5px]'}><span className='text-rose-700 font-bold'>Centro n°2: </span>57 n1240</p>
          <p className={'text-black mt-[5px]'}><span className='text-rose-700 font-bold'>Centro n°3: </span>50 y 120 n200</p>
        </div>
      </div>
    </Link>
  )
}