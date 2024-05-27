import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import RootLayout from "@/layouts/root-layout";
import {
  GetSSPropsResult,
  PostData,
  PostDataAdapter,
  UnadaptedCenter,
  User,
} from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useEffect, useState } from "react";
import CardProduct from "@/components/post-card";
import auxPostPic from "public/post-image-preview.jpg";
import Link from "next/link";
import plusPost from "public/plus-image.png";
import Image from "next/image";
import { Loading } from "@/components/loading";
import { TradeOfferFull, TradeOfferProduct } from "@/components";
import auxProfilePic from "public/profile-pic-default.jpg";

export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}
export default function UserPendingTrades({ user }: { user: User }) {
 const [pendingTrades, setPendingTrades]=useState([]);

  useEffect(() => {
    const getPendingTrades = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/pending-trades`)
        .then((res: any) => {
          setPendingTrades(res.data);
          console.log(res.data);

        })
        .catch((res: any) => {
          try {
            // res.status(res.status).json({ message: res.data.message })
            setPendingTrades([])

          } catch {
            //res.status(500).json({ message: 'Ha ocurrido un error inesperado.' })
            setPendingTrades([])
          }
        },
        )
    }
    getPendingTrades()
  }, [])

  return (
    <RootLayout user={user}>
      <div className="flex w-[100vw]">
        <h1>INTERCAMBIOS PENDIENTES</h1>
      </div>
    </RootLayout>
  );
}
