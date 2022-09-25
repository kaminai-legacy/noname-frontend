<template>
  <div>
    <form @submit.prevent="sendVerification">
      <BaseBtn type="submit" text="Verify Email" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<script lang="ts">
export default {
  name: "UpdatePassword",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, Ref } from "vue";

import { useAuthStore } from "@/store/auth";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import AuthService from "@/services/AuthService";
import { getError } from "@/utils/helpers";

const store = useAuthStore();
const { authUser } = storeToRefs(store);

const error = ref(null);
const message:Ref<string|null> = ref(null);

const sendVerification = () => {
  error.value = null;
  message.value = null;
  const payload = {
    user: authUser.value.id,
  };
  AuthService.sendVerification(payload)
    .then(() => (message.value = "Verification email sent."))
    .catch((catchError) => (error.value = getError(catchError)));
};
</script>
