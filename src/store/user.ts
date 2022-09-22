import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

import { getError } from "@/utils/helpers";
import UserService from "@/services/UserService";

export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const meta = ref(null)
    const links = ref(null)
    const loading = ref(false)
    const error = ref(null)

    function setPaginatedUsers(response) {
        users.value = response.data.data;
        meta.value = response.data.meta;
        links.value = response.data.links;
        loading.value = false;
    }

    function getUsers(page) {
        loading.value = true;
        UserService.getUsers(page)
            .then((response) => {
                setPaginatedUsers(response);
            })
            .catch((error) => {
                loading.value = false;
                error.value = getError(error);
            });
    }

    function paginateUsers(link) {
        loading.value = true;
        UserService.paginateUsers(link)
            .then((response) => {
                setPaginatedUsers(response);
            })
            .catch((error) => {
                loading.value = false;
                error.value = getError(error);
            });
    }

    return { users, meta, links, loading, error, setPaginatedUsers, getUsers, paginateUsers }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
