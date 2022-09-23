<template>
  <form @submit.prevent="updateUser">
    <BaseInput
      type="text"
      label="Name"
      name="name"
      v-model="name"
      class="mb-2"
    />
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Update" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>
<!--
<script lang="ts">
import { mapGetters } from "vuex";
import { getError } from "@/utils/helpers";
import BaseBtn from "@/components/BaseBtn.vue";
import BaseInput from "@/components/BaseInput.vue";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/FlashMessage.vue";

export default {
  name: "AuthUserForm",
  components: {
    BaseBtn,
    BaseInput,
    FlashMessage,
  },
  data() {
    return {
      name: null,
      email: null,
      error: null,
      message: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
  },
  methods: {
    updateUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: this.name,
        email: this.email,
      };
      AuthService.updateUser(payload)
        .then(() => this.$store.dispatch("auth/getAuthUser"))
        .then(() => (this.message = "User updated."))
        .catch((error) => (this.error = getError(error)));
    },
  },
  mounted() {
    this.name = this.authUser.name;
    this.email = this.authUser.email;
  },
};
</script> -->

<script lang="ts">
export default {
  name: "AuthUserForm",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

import { useAuthStore } from "@/store/auth";

import BaseBtn from "@/components/BaseBtn.vue";
import BaseInput from "@/components/BaseInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";

import AuthService from "@/services/AuthService";
import { getError } from "@/utils/helpers";

const store = useAuthStore();
const { authUser } = storeToRefs(store);

const name = ref(null);
const email = ref(null);
const error = ref(null);
const message:any = ref(null);

const updateUser = () => {
  error.value = null;
  message.value = null;
  const payload = {
    name: name.value,
    email: email.value,
  };
  AuthService.updateUser(payload)
    .then(() => store.getAuthUser())
    .then(() => (message.value = "User updated."))
    .catch((error) => (error.value = getError(error)));
};

onMounted(() => {
  name.value = authUser.value.name;
  email.value = authUser.value.email;
});
</script>
