import { useAuthStore } from "@/store/auth";

export default function guest({ next, pinia }) {
  const store = useAuthStore(pinia)
  const storageItem = window.localStorage.getItem('guest')

  if (storageItem === 'isNotGuest' && !store.authUser) {
    store.getAuthUser().then(() => {
      if (store.authUser) {
        next({ name: 'dashboard' })
      } else {
        store.setGuest({ value: 'isGuest' })
        next()
      }
    })
  } else {
    next()
  }
}
