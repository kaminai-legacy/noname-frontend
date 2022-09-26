<template>
  <div aria-label="Pagination" class="flex items-center justify-between py-4">
    <p class="text-sm text-gray-500">Page {{ meta.current_page }} of {{ meta.last_page }}</p>
    <div class="flex">
      <button
        rel="first"
        type="button"
        @click="firstPage"
        v-if="links.prev"
        class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500"
      >
        First
      </button>

      <button
        rel="prev"
        type="button"
        @click="prevPage"
        :class="{ 'rounded-r': !links.next }"
        v-if="links.prev"
        class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500"
      >
        Previous
      </button>

      <button
        rel="next"
        type="button"
        @click="nextPage"
        :class="{ 'rounded-l': !links.prev }"
        v-if="links.next"
        class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500"
      >
        Next
      </button>

      <button
        rel="last"
        type="button"
        @click="lastPage"
        v-if="links.next"
        class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasePagination',
}
</script>

<script setup lang="ts">
import { toRefs, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { Meta, Links } from '@/ts/interfaces/pagination_interfaces'

interface Props {
  store: any
  action: string
  path?: string | null
  meta: Meta
  links: Links
}

const props = withDefaults(defineProps<Props>(), {
  path: null,
})

const { store, action, links, meta, path } = toRefs(props)

const router = useRouter()

const firstPage = () => {
  store.value[action.value](links.value.first).then(() => {
    if (path.value) {
      router.push({
        path: path.value,
        query: { page: 1 },
      })
    }
  })
}

const prevPage = () => {
  store.value[action.value](links.value.prev).then(() => {
    if (path.value) {
      router.push({
        path: path.value,
        query: { page: parseInt(meta.value.current_page) - 1 },
      })
    }
  })
}

const nextPage = () => {
  store.value[action.value](links.value.next).then(() => {
    if (path.value) {
      router.push({
        path: path.value,
        query: { page: parseInt(meta.value.current_page) + 1 },
      })
    }
  })
}

const lastPage = () => {
  store.value[action.value](links.value.last).then(() => {
    if (path.value) {
      router.push({
        path: path.value,
        query: { page: parseInt(meta.value.last_page) },
      })
    }
  })
}
</script>
