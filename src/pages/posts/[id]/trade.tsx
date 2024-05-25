import { useRouter } from 'next/router'

export default function Trade () {
  const router = useRouter()
  return (
    <div>
      <h1>Trade, {router.query.id}</h1>
    </div>
  )
}
