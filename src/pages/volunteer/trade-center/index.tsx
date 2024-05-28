import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import {
  FullOfferTradeCard,
  GetSSPropsResult,
  PostData,
  PostDataAdapter,
  UnadaptedCenter,
  User,
} from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import auxProfilePic from 'public/profile-pic-default.jpg'
import auxPostPic from 'public/post-image-preview.jpg'
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";

import { Loading } from "@/components/loading";


import AuditTradeCard from "@/components/audit-trade-card";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}

export default function VolunteerTradeSection({ user }: { user: User }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);

  return (
    <RootLayout user={user}>
      <div className="flex w-[100vw]">
        <div className="m-auto">
          {isLoading ? (
            <div className="flex mt-[50px]">
              <div className="">
                <Loading />
              </div>
            </div>
          ) :
            // <div>
            //   {true ?
            //     <div>
            //       <div className="flex flex-col">
            //         <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            //           INTERCAMBIOS
            //         </p>
            //         <div className=" mt-[20px]">

            //         </div>
            //       </div>
            //     </div> : <div className="flex flex-col">
            //       <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">
            //         NO TIENES OFERTAS DE INTERCAMBIOS PENDIENTES
            //       </p>
            //       <div className="flex mt-[40px] m-auto">
            //       </div>
            //     </div>}
            // </div>
            <AuditTradeCard
              idTrade={0}
              nameOwner={"Geronimo"}
              surnameOwner={"Benavidez"}
              nameOffer={'Thiago'}
              surnameOffer={'Martinez'}
              firstImagePostOwner={auxProfilePic.src}
              firstImagePostOffer={auxProfilePic.src}
              profilePicOwner={auxProfilePic.src}
              profilePicOffer={auxProfilePic.src}
              centerName={""}
              locationTrade={""}
              centerAddress={""}
              tradeDate={"29-06-2024"}
              tradeHour={"11:00"}
              tradeState={""}
              idPostOwner={0}
              idPostOffer={0}
              user={user} />
          }
        </div>
      </div>
    </RootLayout>
  );
}
