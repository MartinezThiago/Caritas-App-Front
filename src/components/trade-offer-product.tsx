import { TradeCardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function TradeOfferProduct(props: TradeCardProductProps) {

  return (
    
    <Link href={`/posts/${props.idPost}`} className='w-[100%] h-[12rem] border-[2px] rounded-xl border-blue-900 hover:scale-105 duration-300'>
      <div className='flex h-[100%]'>
        <div className='flex w-[70%] justify-center items-center'>
          <Image className='w-[50%] rounded-tl-xl rounded-bl-xl' width='0' height='0' alt={`post-image-${props.idPost}`} src={props.imagePost} />
        </div>
        <div className=' w-[100%] h-[100%]'>
          <div className='h-[100%] w-[100%] flex '>
            <div className={'h-[100%] w-[100%] flex flex-col justify-between'}>
              <div className='mt-2 ms-2'>
                <p className={'text-2xl font-bold'}>{props.title}</p>
                <h2 className=''>{props.desciption}</h2>
              </div>
              <div className={'flex justify-center items-center'}>
                <p className={'font-bold text-white bg-rose-700 rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
                <p className={'font-bold text-white bg-rose-700 rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
              </div>
              <div className='flex items-center mb-[15px]'>
                <div className="flex items-center ms-[20px]">
                  <Image
                    alt={`ownerPostProfilePic`}
                    className={"w-[32px] rounded-full"}
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
            <div>

            </div>

          </div>
          
        </div>
        
      </div>

    </Link>
  )
}