<template>
  <form @submit.prevent="registerUser">
    <BaseInput
      type="text"
      label="Name"
      name="name"
      v-model="fields.name"
      placeholder="Luke"
      class="mb-2"
    />
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="fields.email"
      placeholder="luke@jedi.com"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Password"
      name="password"
      v-model="fields.password"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Confirm Password"
      name="password-confirm"
      v-model="fields.passwordConfirm"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Register" />
    <FlashMessage :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: 'RegisterForm',
}
</script>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import BaseBtn from '@/components/main_layout/BaseBtn.vue'
import BaseInput from '@/components/main_layout/BaseInput.vue'
import FlashMessage from '@/components/main_layout/FlashMessage.vue'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'

interface Fields {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const router = useRouter()

const error = ref(null)

const fields = reactive<Fields>({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const registerUser = () => {
  error.value = null
  const payload = {
    name: fields.name,
    email: fields.email,
    password: fields.password,
    password_confirmation: fields.passwordConfirm,
  }
  AuthService.registerUser(payload)
    .then(() => router.push('/dashboard'))
    .catch((catchError) => (error.value = getError(catchError)))
}
</script>
