import Image from 'next/image'
import Link from 'next/link'

/**
 * The product card data.
 * @property {number} id - The product id.
 * @property {string} title - The product title.
 * @property {string} desciption - The product description.
 * @property {string} nameProductCategorie - The product categorie.
 * @property {string} nameProductState - The product state.
 * @property {string} locationTrade - The ubication of the trade
 * @property {string} image - The first image of the post
 */
export interface CardProductProps {
  id: number
  title: string
  desciption: string
  nameProductCategorie: string
  nameProductState: string
  locationTrade: string
  image: string
  ownerPost: boolean
  link?: string
  handleClick?: (id: string) => void
  enableLink?: boolean
  onMyPost?: boolean
  statePost?: number
}

export default function CardProduct({
  id,
  title,
  desciption,
  nameProductCategorie,
  nameProductState,
  locationTrade,
  image,
  ownerPost,
  link,
  handleClick,
  onMyPost,
  statePost,
  enableLink = true
}: CardProductProps) {
  const Slot = enableLink ? Link : 'div'
  
  function truncateText(text:string,maxLength:number){
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
  } else {
      return text;
  }
  }

  const onClick = () => {
    handleClick && handleClick(String(id))
  }

  return (
    <Slot
      href={link ? link : `/posts/${id}`}
      className='w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[2px] border-blue-900 rounded-tl-[15px] rounded-br-[15px] hover:scale-105 duration-300 cursor-pointer'
      onClick={onClick}
    >
      <div className='h-[145px] flex items-center justify-center'>
        <Image
          alt={`post-image-${id}`}
          className={'h-auto w-[35%]'}
          src={image}
          width={0}
          height={0}
        />
      </div>
      <div className={'flex flex-col justify-between h-[54%] '}>
        <div className='mt-2.5 ms-2.5 h-full flex flex-col justify-between'>
          <div>
            <p className={'text-2xl font-bold'}>{title}</p>
            <p className='ms-2.5 mt-0.5'>{truncateText(desciption,25)}</p>
          </div>
          <div>
            {ownerPost ? (
              <p className='font-bold text-sm text-rose-700'>Guardado</p>
            ) : (
              <></>
            )}
            {onMyPost ? (
              statePost == 1 ? <p className='font-bold text-sm text-blue-900'>Publicado</p> : statePost == 2 ? <p className='font-bold text-sm text-gray-500'>Ofertado</p> : statePost == 4 ?<p className='font-bold text-sm text-green-700'>En proceso de intercambio</p>:statePost == 3 ?<p className='font-bold text-sm text-rose-700'>Baneada</p>:<></>
            ) : (
              <></>
            )}
            <p className='font-semibold mb-1.5'>{truncateText(locationTrade,25)}</p>
          </div>
        </div>
        <div
          className={
            'flex justify-center items-center border-t-[1px] border-blue-900 h-10 '
          }
        >
          <p
            className={
              'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'
            }
          >
            {nameProductCategorie}
          </p>
          <p
            className={
              'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'
            }
          >
            {nameProductState}
          </p>
        </div>
      </div>
    </Slot>
  )
}
