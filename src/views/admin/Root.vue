<template>
  <section class="page-wrapper">
    <header-main>
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/admin">Dashboard</router-link>
        |
        <router-link to="/admin/users">Users</router-link>
      </nav>
    </header-main>
    <main>
      <router-view />
    </main>
    <footer-main></footer-main>
  </section>
</template>

<script lang="ts">
export default {
  name: 'Root',
}
</script>

<script setup lang="ts">
import FooterMain from '@/components/admin_layout/Footer.vue'
import HeaderMain from '@/components/admin_layout/Header.vue'
</script>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
}
</style>
