<template>
  <form @submit.prevent="updateUser">
    <BaseInput type="text" label="Name" name="name" v-model="fields.name" class="mb-2" />
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="fields.email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Update" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: 'AuthUserForm',
}
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted, reactive } from 'vue'

import { useAuthStore } from '@/store/auth'

import BaseBtn from '@/components/main_layout/BaseBtn.vue'
import BaseInput from '@/components/main_layout/BaseInput.vue'
import FlashMessage from '@/components/main_layout/FlashMessage.vue'

import AuthService from '@/services/AuthService'
import { getError } from '@/utils/helpers'

interface Fields {
  name: string
  email: string
}

const store = useAuthStore()
const { authUser } = storeToRefs(store)

const error = ref(null)
const message: any = ref(null)

const fields = reactive<Fields>({
  name: '',
  email: '',
})

const updateUser = () => {
  error.value = null
  message.value = null
  const payload = {
    name: fields.name,
    email: fields.email,
  }
  AuthService.updateUser(payload)
    .then(() => store.getAuthUser())
    .then(() => (message.value = 'User updated.'))
    .catch((catchError) => (error.value = getError(catchError)))
}

onMounted(() => {
  fields.name = authUser.value.name
  fields.email = authUser.value.email
})
</script>
