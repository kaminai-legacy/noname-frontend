/*
 * This is the initial API interface
 * we set the base URL for the API
 */

import {apiAxios} from '@/axios'

import pinia from "@/store";
import { useAuthStore } from '@/store/auth'

export const apiClient = apiAxios

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
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
