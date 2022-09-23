<template>
  <div v-if="authUser">
    <transition name="fade">
      <img
        v-if="authUser.avatar"
        :src="authUser.avatar"
        class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
        alt=""
      />
    </transition>
    <ul>
      <li class="mb-1 font-bold">{{ authUser.name }}</li>
      <li>Email: {{ authUser.email }}</li>
      <li v-if="authUser.emailVerified" class="text-gray-500">
        Emailed Verified
      </li>
    </ul>
    <VerifyEmail v-if="!authUser.emailVerified" class="mt-4" />
  </div>
</template>

<!-- <script>
import { mapGetters } from "vuex";
import VerifyEmail from "@/components/VerifyEmail.vue";

export default {
  name: "AuthUser",
  components: {
    VerifyEmail,
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
  },
};
</script> -->

<script lang="ts">
export default {
  name: "AuthUser",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/store/auth";

import VerifyEmail from "@/components/VerifyEmail.vue";

const store = useAuthStore();
const { authUser } = storeToRefs(store);

</script>
