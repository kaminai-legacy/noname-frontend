import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import UserService from '@/services/UserService'
import { getError } from '@/utils/helpers'

import { Meta, Links } from '@/ts/interfaces/pagination_interfaces'
import { Users } from '@/ts/types/store_types'

export const useUserStore = defineStore('user', () => {
  const users: Ref<Users> = ref([])
  const meta: Ref<Meta | null> = ref(null)
  const links: Ref<Links> = ref({} as Links)
  const loading = ref(false)
  const error = ref(null)

  function setPaginatedUsers(response) {
    users.value = response.data.data
    meta.value = response.data.meta
    links.value = response.data.links
    loading.value = false
  }

  function getUsers(page): Promise<any> {
    loading.value = true
    return UserService.getUsers(page)
      .then((response) => {
        setPaginatedUsers(response)
      })
      .catch((catchError) => {
        loading.value = false
        error.value = getError(catchError)
      })
  }

  function paginateUsers(link) {
    loading.value = true
    UserService.paginateUsers(link)
      .then((response) => {
        setPaginatedUsers(response)
      })
      .catch((catchError) => {
        loading.value = false
        error.value = getError(catchError)
      })
  }

  return { users, meta, links, loading, error, setPaginatedUsers, getUsers, paginateUsers }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
