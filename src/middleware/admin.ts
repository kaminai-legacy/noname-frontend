import { useAuthStore } from '@/store/auth'

export default function admin({ next, pinia }) {
  const store = useAuthStore(pinia)

  if (store.isAdmin) next()
  else next({ name: 'notFound' })
}
