import { useAuthStore } from '@/store/auth'

export default function auth({ to, next, pinia }) {
  const store = useAuthStore(pinia)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (!store.authUser) {
    store.getAuthUser().then(() => {
      if (!store.authUser) next(loginQuery)
      else next()
    })
  } else {
    next()
  }
}
