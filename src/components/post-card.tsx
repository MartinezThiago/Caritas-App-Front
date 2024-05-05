import { CardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function CardProduct(props:CardProductProps) {
  console.log('CARD PRODUCT');
  
  return (
    <Link href={`posts/${props.id}`} className='w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[3px] border-blue-900 rounded-md hover:scale-105 duration-300'>
      <div className='h-[145px]'>
        <Image alt={`post-image-${props.id}`} className={'m-auto'} src={props.image} width={140} height={0}/>
      </div>
      <div className={'flex flex-col justify-between h-[54%] '}>
        <div className='mt-2.5 ms-2.5 h-full flex flex-col justify-between'>
          <div>
            <p className={'text-2xl font-bold'}>{props.title}</p>
            <p className='ms-2.5 mt-0.5'>{props.desciption}</p>
          </div>
          <p className='font-semibold mb-1.5'>{props.locationTrade}</p>
        </div>
        <div className={'flex justify-center items-center border-t-[1px] border-blue-900 h-10 '}>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
        </div>
      </div>
    </Link>
  )
}
