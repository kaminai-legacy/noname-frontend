<template>
  <form @submit.prevent="updatePassword">
    <div class="mb-2">
      <label for="password" class="text-sm text-gray-500">Current Password</label>
      <input
        type="password"
        id="current-password"
        v-model="fields.currentPassword"
        class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="mb-2">
      <label for="password" class="text-sm text-gray-500">Password</label>
      <input
        type="password"
        id="password"
        v-model="fields.password"
        class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="mb-4">
      <label for="password-confirm" class="text-sm text-gray-500">Confirm Password</label>
      <input
        type="password"
        id="password-confirm"
        v-model="fields.passwordConfirm"
        class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <BaseBtn type="submit" text="Update" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: 'UpdatePassword',
}
</script>

<script setup lang="ts">
import { ref, Ref, reactive } from 'vue'

import BaseBtn from '@/components/main_layout/BaseBtn.vue'
import FlashMessage from '@/components/main_layout/FlashMessage.vue'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'

const error = ref(null)
const message: Ref<string | null> = ref(null)

const fields = reactive({
  currentPassword: null,
  password: null,
  passwordConfirm: null,
})

const updatePassword = () => {
  error.value = null
  message.value = null
  const payload = {
    current_password: fields.currentPassword,
    password: fields.password,
    password_confirmation: fields.passwordConfirm,
  }
  AuthService.updatePassword(payload)
    .then(() => (message.value = 'Password updated.'))
    .catch((catchError) => (error.value = getError(catchError)))
}
</script>
