<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/vue.svg" width="200" height="200" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'VueExample',
}
</script>

<script setup lang="ts">
import HelloWorld from '@/components/common/HelloWorld.vue' // @ is an alias to /src
</script>
