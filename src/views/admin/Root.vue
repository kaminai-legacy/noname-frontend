<template>
  <section class="page-wrapper">
    <header-main>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">Dashboard</router-link> |
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
  name: "Root",
};
</script>

<script setup lang="ts">
import Footer from '@/components/admin_layout/Footer.vue';
import Header from '@/components/admin_layout/Header.vue';
</script>

<!-- <script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/common/HelloWorld.vue'; // @ is an alias to /src
import Footer from '@/components/admin_layout/Footer.vue';
import Header from '@/components/admin_layout/Header.vue';

@Options({
  components: {
    HelloWorld,
    HeaderMain: Header,
    FooterMain: Footer,
  },
})
export default class Root extends Vue {}
</script> -->

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
}
</style>
