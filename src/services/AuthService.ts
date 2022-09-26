import { apiAxios } from '@/axios'

import pinia from '@/store'
import { useAuthStore } from '@/store/auth'

export const authClient = apiAxios
/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const store = useAuthStore(pinia)
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.authUser &&
      !store.guest
    ) {
      store.logout()
    }
    return Promise.reject(error)
  }
)

export default {
  async login(payload) {
    await authClient.get('/csrf-cookie')
    return authClient.post('/login', payload)
  },
  logout() {
    return authClient.post('/logout')
  },
  async forgotPassword(payload) {
    await authClient.get('/csrf-cookie')
    return authClient.post('/forgot-password', payload)
  },
  getAuthUser() {
    return authClient.get('/users/auth')
  },
  async resetPassword(payload) {
    await authClient.get('/csrf-cookie')
    return authClient.post('/reset-password', payload)
  },
  updatePassword(payload) {
    return authClient.put('/user/password', payload)
  },
  async registerUser(payload) {
    const some = await authClient.get('/csrf-cookie')
    return authClient.post('/register', payload)
  },
  sendVerification(payload) {
    return authClient.post('/email/verification-notification', payload)
  },
  updateUser(payload) {
    return authClient.put('/user/profile-information', payload)
  },
}
