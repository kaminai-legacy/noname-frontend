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
  export default {
    name: "Logout",
  };
  </script>

  <script setup lang="ts">

  import { useAuthStore } from "@/store/auth";

  import LogoutIcon from "@/components/common/icons/LogoutIcon.vue";

  const store = useAuthStore()

  const logout = () => {
    store.logout();
  }
  </script>
