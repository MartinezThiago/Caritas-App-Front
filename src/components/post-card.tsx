import { CardProductProps } from '@/types'

import Image from 'next/image'

export default function CardProduct(props: CardProductProps) {
  return (
    // <div className={`product-card-container-${props.style_class_card}`}>
    <div className='flex flex-col justify-center items-center w-[18rem] h-[20rem] me-[1rem] mb-[1rem] border-[3px] border-blue-900 rounded-sm'>
      <Image alt={`post-image-${props.id}`} src={props.image_source} />
      <div className={`product-info-text-container-${props.style_class_card}`}>
        <p className={`product-title-${props.style_class_card}`}><b>{props.title}</b></p>
        <h2>{props.desc}</h2>
        <div className={`product-categories-container-${props.style_class_card}`}>
          <p className={`product-categories-${props.style_class_card}`}>{props.categorie}</p>
          <p className={`product-categories-${props.style_class_card}`}>{props.state}</p>
        </div>
      </div>
    </div>
  )
}
