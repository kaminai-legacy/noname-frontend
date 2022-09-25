<template>
  <div class="max-w-sm p-5 m-auto">
    <h2 class="mb-4 text-xl font-bold text-center">Forgot Password</h2>
    <form @submit.prevent="forgotPassword" class="p-5 bg-white border rounded shadow">
      <BaseInput type="email" label="Email" name="email" v-model="email" autocomplete="email"
        placeholder="luke@jedi.com" class="mb-4" />
      <BaseBtn type="submit" text="Send" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<script lang="ts">
export default {
  name: "ForgotPassword",
};
</script>

<script setup lang="ts">
import { ref, Ref, reactive } from "vue";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import BaseInput from "@/components/main_layout/BaseInput.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";

const error = ref(null)
const email = ref(null)
const message: Ref<string | null> = ref(null)

const fields = reactive({
  email: null,
  password: null,
  passwordConfirm: null,
})

const forgotPassword = () => {
  error.value = null;
  message.value = null;
  const payload = {
    email: email.value,
  };
  AuthService.forgotPassword(payload)
    .then(() => (message.value = "Reset password email sent."))
    .catch((error) => (error.value = getError(error)));
}
</script>
