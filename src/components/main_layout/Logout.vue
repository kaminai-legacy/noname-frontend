<template>
  <button
    type="button"
    @click="logout"
    class="inline-flex items-center space-x-2"
  >
    <span class="hidden sm:inline">Logout</span>
    <LogoutIcon class="w-6 h-6 text-white" />
  </button>
</template>

<script lang="ts">
import LogoutIcon from "@/components/common/icons/LogoutIcon.vue";
export default {
  components: { LogoutIcon },
  name: "Logout",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
