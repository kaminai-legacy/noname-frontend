<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UpdatePassword',
}
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useAuthStore } from '@/store/auth'

const store = useAuthStore()
const { authUser } = storeToRefs(store)

onMounted(() => {
  console.log('onMounted')
  console.log(store)
})
</script>
