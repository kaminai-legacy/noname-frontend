<template>
  <section class="page-wrapper">
    <header-main>
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/vue-example">Vue-Example</router-link>
        |
        <router-link to="/admin">Admin</router-link>
        <HeaderSPA/>
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
import FooterMain from '@/components/main_layout/Footer.vue'
import HeaderMain from '@/components/main_layout/HeaderScaffold.vue'
import HeaderSPA from '@/components/main_layout/Header.vue'
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
