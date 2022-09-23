<template>
  <div>
    <form @submit.prevent="sendVerification">
      <BaseBtn type="submit" text="Verify Email" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<!-- <script>
import { mapGetters } from "vuex";
import { getError } from "@/utils/helpers";
import BaseBtn from "@/components/BaseBtn.vue";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/FlashMessage.vue";

export default {
  name: "UpdatePassword",
  components: {
    BaseBtn,
    FlashMessage,
  },
  data() {
    return {
      error: null,
      message: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
  },
  methods: {
    sendVerification() {
      this.error = null;
      this.message = null;
      const payload = {
        user: this.authUser.id,
      };
      AuthService.sendVerification(payload)
        .then(() => (this.message = "Verification email sent."))
        .catch((error) => (this.error = getError(error)));
    },
  },
};
</script> -->



<script lang="ts">
export default {
  name: "UpdatePassword",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useAuthStore } from "@/store/auth";

import BaseBtn from "@/components/BaseBtn.vue";
import FlashMessage from "@/components/FlashMessage.vue";

import AuthService from "@/services/AuthService";
import { getError } from "@/utils/helpers";

const store = useAuthStore();
const { authUser } = storeToRefs(store);

const error = ref(null);
const message = ref(null);

sendVerification = () => {
  error.value = null;
  message.value = null;
  const payload = {
    user: authUser.value.id,
  };
  AuthService.sendVerification(payload)
    .then(() => (message.value = "Verification email sent."))
    .catch((error) => (error.value = getError(error)));
};
</script>
