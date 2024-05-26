import { TradeCardProductProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function TradeOfferProduct(props: TradeCardProductProps) {
  // console.log(props);

  return (
    // <Link href={`/posts/${props.idPost}`} className='w-[16rem] h-[20rem] me-[1rem] mb-[1rem] border-[2px] border-blue-900 rounded-tl-[15px] rounded-br-[15px] hover:scale-105 duration-300'>
    //   <div className='h-[145px] flex items-center justify-center'>
    //     <Image alt={`post-image-${props.idPost}`} className={'h-auto w-[130px]'} src={props.imagePost} width={0} height={0} />
    //   </div>
    //   <div className={'flex flex-col justify-between h-[54%] '}>
    //     <div className='mt-2.5 ms-2.5 h-full flex flex-col justify-between'>
    //       <div>
    //         <p className={'text-2xl font-bold'}>{props.title}</p>
    //         <p className='ms-2.5 mt-0.5'>{props.desciption}</p>
    //       </div>
    //       <div>
    //         <Image
    //           alt={`ownerPostProfilePic`}
    //           className={"w-[38px] rounded-full"}
    //           width={0}
    //           height={0}
    //           src={props.profilePic}
    //         />
    //         <p className="ms-[5px]">
    //           {props.name} {props.surname}
    //         </p>
    //         <p className='font-semibold mb-1.5'>{props.location}</p>
    //       </div>
    //     </div>
    //     <div className={'flex justify-center items-center border-t-[1px] border-blue-900 h-10 '}>
    //       <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
    //       <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
    //     </div>
    //   </div>
    // </Link>
    <Link href={`/posts/${props.idPost}`} className='w-[100%] h-[12rem] border-[2px] rounded-xl border-blue-900 hover:scale-105 duration-300'>
      <div className='flex h-[100%]'>
        <Image className='w-[150px] m-2.5 h-[150px] rounded-tl-xl rounded-bl-xl' width='0' height='0' alt={`post-image-${props.idPost}`} src={props.imagePost} />
        <div className=' w-[100%] h-[100%]'>
          <div className='flex content-between justify-between w-full'>
            <div className={'mt-3.5 ms-3.5	w-[50%] '}>
              <p className={'text-2xl font-bold'}>{props.title}</p>
              <h2 className=''>{props.desciption}</h2>
              <div className={'flex justify-center items-center mt-6'}>
                <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductCategorie}</p>
                <p className={'font-bold text-white bg-rose-700 inline rounded-xl text-sm px-2.5 py-0.5 m-auto'}>{props.nameProductState}</p>
              </div>
            </div>
            <div>

            </div>
            <div className='border-s-[1px] border-blue-900 h-[100%]'>
              <p className="text-rose-700 text-l font-bold">Centro elegido</p>
              <p>Buenos Aires,La Plata</p>
              <p className="">Centro X </p>
              <p>50 120 n130</p>
              <p>27/05/2024</p>
            </div>
          </div>
          {/* <div className='flex items-center '>
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
          </div> */}
        </div>

      </div>

    </Link>
  )
}