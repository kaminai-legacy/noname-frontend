<template>
  <form @submit.prevent="login">
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Password"
      name="password"
      v-model="password"
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

<!-- <script>
import { getError } from "@/utils/helpers";
import BaseBtn from "@/components/BaseBtn.vue";
import BaseInput from "@/components/BaseInput.vue";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/FlashMessage.vue";

export default {
  name: "LoginView",
  components: {
    BaseBtn,
    BaseInput,
    FlashMessage,
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.error = null;
      try {
        await AuthService.login(payload);
        const authUser = await this.$store.dispatch("auth/getAuthUser");
        if (authUser) {
          this.$store.dispatch("auth/setGuest", { value: "isNotGuest" });
          this.$router.push("/dashboard");
        } else {
          const error = Error(
            "Unable to fetch user after login, check your API settings."
          );
          error.name = "Fetch User";
          throw error;
        }
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
};
</script> -->

<script lang="ts">
export default {
  name: "LoginView",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/auth";

import BaseBtn from "@/components/BaseBtn.vue";
import BaseInput from "@/components/BaseInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";

import AuthService from "@/services/AuthService";

const router = useRouter();
const store = useAuthStore();
const { authUser } = storeToRefs(store);

const email = ref(null);
const password = ref(null);
const error = ref(null);

login = async () => {
  const payload = {
    email: email.value,
    password: password.value,
  };
  error.value = null;
  try {
    await AuthService.login(payload);
    const authUser = await store.getAuthUser();
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
  } catch (error) {
    error.value = getError(error);
  }
};
</script>
