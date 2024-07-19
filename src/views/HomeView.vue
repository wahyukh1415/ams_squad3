<script setup>
import { RouterView } from "vue-router";
</script>
<template>
  <RouterView />
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
