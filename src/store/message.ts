import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import MessageService from '@/services/MessageService'
import { getError } from '@/utils/helpers'

import { Meta, Links } from '@/ts/interfaces/pagination_interfaces'
import { Messages } from '@/ts/types/store_types'

export const useMessageStore = defineStore('message', () => {
  const messages: Ref<Messages> = ref([])
  const meta: Ref<Meta | null> = ref(null)
  const links: Ref<Links> = ref({} as Links)
  const loading = ref(false)
  const error = ref(null)

  function setPaginatedMessages(response) {
    messages.value = response.data.data
    meta.value = response.data.meta
    links.value = response.data.links
    loading.value = false
  }

  function getMessages(page) {
    loading.value = true
    MessageService.getMessages(page)
      .then((response) => {
        setPaginatedMessages(response)
      })
      .catch((catchError) => {
        loading.value = false
        error.value = getError(catchError)
      })
  }

  function postMessage(payload) {
    return MessageService.postMessage(payload).then((response) => {
      setPaginatedMessages(response)
    })
  }

  function paginateMessages(link) {
    loading.value = true
    MessageService.paginateMessages(link)
      .then((response) => {
        setPaginatedMessages(response)
      })
      .catch((catchError) => {
        loading.value = false
        error.value = getError(catchError)
      })
  }

  return {
    messages,
    meta,
    links,
    loading,
    error,
    setPaginatedMessages,
    getMessages,
    postMessage,
    paginateMessages,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
}
