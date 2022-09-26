<template>
  <form @submit.prevent="login">
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="fields.email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Password"
      name="password"
      v-model="fields.password"
      class="mb-4"
    />
    <div class="flex justify-between">
      <BaseBtn type="submit" text="Login" />
      <router-link to="/forgot-password" class="text-sm base-link">
        Forgot your password?
      </router-link>
    </div>
    <FlashMessage :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: "LoginView",
};
</script>

<script setup lang="ts">
import { ref, Ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/auth";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import BaseInput from "@/components/main_layout/BaseInput.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import AuthService from "@/services/AuthService";
import { getError } from "@/utils/helpers";

interface Fields {
  email: string
  password: string
}

const router = useRouter();
const store = useAuthStore();

const error = ref(null);

const fields = reactive<Fields>({
  email: '',
  password: '',
})

const login = async () => {
  const payload = {
    email: fields.email,
    password: fields.password,
  };
  error.value = null;
  try {
    await AuthService.login(payload);
    const authUser = await store.getAuthUser();
    console.log('authUser')
    console.log(authUser)
    if (authUser) {
      store.setGuest({ value: "isNotGuest" });
      router.push("/dashboard");
    } else {
      const error = Error(
        "Unable to fetch user after login, check your API settings."
      );
      error.name = "Fetch User";
      throw error;
    }
  } catch (catchError) {
    error.value = getError(catchError);
  }
};
</script>
