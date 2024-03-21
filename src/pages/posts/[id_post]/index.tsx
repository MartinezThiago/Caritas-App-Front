import { useRouter } from "next/router"

export default function Juju(){
    const router=useRouter();
    return <h1>Clickeaste en Post {router.query.id_post}</h1>
}