<template>
  <div aria-label="Pagination" class="flex items-center justify-between py-4">
    <p class="text-sm text-gray-500">
      Page {{ meta.current_page }} of {{ meta.last_page }}
    </p>
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
    name: "BasePagination",
  };
  </script>

  <script setup lang="ts">
    import { useRouter } from 'vue-router'

  interface Props {
    action: string
    path?: string|null
    meta: object
    links: object
  }

  const props = withDefaults(defineProps<Props>(), {
    path: null,
  })
  const emit = defineEmits(['input'])
  const router = useRouter()

  const updateValue = (event) => {
    return emit('input', event.target.value)
  }

  const firstPage = () => {
      this.$store.dispatch(action, links.first).then(() => {
        if (path) {
          router.push({
            path: path,
            query: { page: 1 },
          });
        }
      });
    }

    const prevPage = () => {
      this.$store.dispatch(action, links.prev).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: meta.current_page - 1 },
          });
        }
      });
    }

    const nextPage = () => {
      this.$store.dispatch(action, links.next).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: meta.current_page + 1 },
          });
        }
      });
    }

    const lastPage = () => {
      this.$store.dispatch(action, links.last).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: { page: meta.last_page },
          });
        }
      });
    }

  </script>
