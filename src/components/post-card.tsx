import { CardProductProps } from '@/types'
import postImagePreview from 'public/post-image-preview.jpg'
import Link from 'next/link'
import Image from 'next/image'

export default function CardProduct(props: CardProductProps) {
  return (
    <Link href={`posts/${props.id_post}`} className='w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[3px] border-blue-900 rounded-md hover:scale-105 duration-300'>
      <Image alt={`post-image-${props.id_post}`} src={postImagePreview} />
      <div className={'m-3.5'}>
        <p className={'text-2xl font-bold'}>{props.title}</p>
        <h2>{props.description}</h2>
        <div className={'flex justify-center items-center mt-[20%] '}>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.categorie}</p>
          <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.state}</p>
        </div>
      </div>
    </Link>
  )
}
