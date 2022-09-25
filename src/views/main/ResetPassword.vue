<template>
  <div class="max-w-sm p-5 m-auto">
    <h2 class="mb-4 text-xl font-bold text-center">Reset Password</h2>
    <form @submit.prevent="resetPassword" class="p-5 bg-white border rounded shadow">
      <div class="mb-2">
        <label for="email" class="text-sm text-gray-500">Email</label>
        <input type="email" id="email" v-model="fields.email"
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mb-2">
        <label for="password" class="text-sm text-gray-500">Password</label>
        <input type="password" id="password" v-model="fields.password"
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mb-4">
        <label for="password-confirm" class="text-sm text-gray-500">Confirm Password</label>
        <input type="password" id="password-confirm" v-model="fields.passwordConfirm"
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <BaseBtn type="submit" text="Reset Password" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<script lang="ts">
  export default {
    name: "ResetPassword",
  };
  </script>

<script setup lang="ts">
import { ref, Ref, reactive } from "vue";
import { useRoute } from "vue-router";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";

const route = useRoute()

const error = ref(null)
const message:Ref<string|null> = ref(null)

const fields = reactive({
  email: null,
  password: null,
  passwordConfirm: null,
})

const resetPassword = () => {
  error.value = null;
  message.value = null;
  const payload = {
    email: fields.email,
    password: fields.password,
    password_confirmation: fields.passwordConfirm,
    token: route.query.token,
  };
  AuthService.resetPassword(payload)
    .then(() => (message.value = "Password reset."))
    .catch((catchError) => (error.value = getError(catchError)));
}
</script>
