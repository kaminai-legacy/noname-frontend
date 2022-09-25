import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

import router from '@/router'
import AuthService from '@/services/AuthService'
import { getError } from '@/utils/helpers'

export const useAuthStore = defineStore('auth', () => {
  const user: any = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const authUser = computed(() => user.value)
  const isAdmin = computed(() => (user.value ? user.value.isAdmin : false))
  const loggedIn = computed(() => !!user.value)
  const guest = computed(() => {
    const storageItem = window.localStorage.getItem('guest')
    if (!storageItem) return false
    if (storageItem === 'isGuest') return true
    if (storageItem === 'isNotGuest') return false
  })

  function logout() {
    return AuthService.logout()
      .then(() => {
        user.value = null
        setGuest({ value: 'isGuest' })
        if (router.currentRoute.value.name !== 'login') router.push({ path: '/login' })
      })
      .catch((catchError) => {
        error.value = getError(catchError)
      })
  }

  async function getAuthUser() {
    loading.value = true
    try {
      const response = await AuthService.getAuthUser()
      user.value = response.data.data
      loading.value = false
      return response.data.data
    } catch (catchError) {
      loading.value = false
      user.value = null
      error.value = getError(catchError)
    }
  }

  function setGuest({ value }) {
    window.localStorage.setItem('guest', value)
  }

  return { user, loading, error, authUser, isAdmin, loggedIn, guest, logout, getAuthUser, setGuest }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
