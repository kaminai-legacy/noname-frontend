import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

import { getError } from "@/utils/helpers";
import MessageService from "@/services/MessageService";

export const useMessageStore = defineStore('message', () => {
    const messages = ref([])
    const meta = ref(null)
    const links = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // const messages = computed(() => messages)
    // const meta = computed(() => meta)
    // const links = computed(() => links)
    // const loading = computed(() => loading)
    // const error = computed(() => error)

    function setPaginatedMessages(response) {
        // commit("SET_MESSAGES", response.data.data);
        messages.value = response.data.data
        // commit("SET_META", response.data.meta);
        meta.value = response.data.meta
        // commit("SET_LINKS", response.data.links);
        links.value = response.data.links
        // commit("SET_LOADING", false);
        loading.value = false
    };

    function getMessages(page) {
        loading.value = true
        MessageService.getMessages(page)
            .then((response) => {
                setPaginatedMessages(response);
            })
            .catch((error) => {
                loading.value = false
                error.value = getError(error);
            });
    }

    function postMessage(payload) {
        return MessageService.postMessage(payload).then((response) => {
            setPaginatedMessages(response);
        });
    }

    function paginateMessages(link) {
        loading.value = true
        MessageService.paginateMessages(link)
            .then((response) => {
                setPaginatedMessages(response);
            })
            .catch((error) => {
                loading.value = false
                error.value = getError(error);
            });
    }

    return { messages, meta, links, loading, error, setPaginatedMessages, getMessages, postMessage, paginateMessages }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
}

