import { CardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function CardProduct(props: CardProductProps) {
  return (
    <Link href={`posts/${props.id}`} className='w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[2px] border-blue-900 rounded-tl-[15px] rounded-br-[15px] hover:scale-105 duration-300'>
      <div className='h-[145px] flex items-center justify-center'>
        <Image alt={`post-image-${props.id}`} className={'h-auto w-[140px]'} src={props.image} width={0} height={0} />
      </div>
      <div className={'flex flex-col justify-between h-[54%] '}>
        <div className='mt-2.5 ms-2.5 h-full flex flex-col justify-between'>
          <div>
            <p className={'text-2xl font-bold'}>{props.title}</p>
            <p className='ms-2.5 mt-0.5'>{props.desciption}</p>
          </div>
          <div>
            {props.ownerPost ? <p className='font-bold text-sm text-rose-700'>Tu publicacion</p> : <></>}
            <p className='font-semibold mb-1.5'>{props.locationTrade}</p>
          </div>
        </div>
        <div className={'flex justify-center items-center border-t-[1px] border-blue-900 h-10 '}>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
        </div>
      </div>
    </Link>
  )
}
