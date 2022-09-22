<template>
  <header>
    <h1>This is a admin header</h1>
    <slot></slot>
  </header>
</template>

<!-- <script lang="ts">
import { Vue } from 'vue-class-component';

export default class Header extends Vue {}
</script> -->

<script lang="ts">
export default {
  name: "Header",
};
</script>
