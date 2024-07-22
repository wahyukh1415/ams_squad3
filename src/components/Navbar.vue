<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
  authCheck();
});
</script>

<template>
  <div class="container py-4 d-flex align-items-center">
    <p class="fw-semibold mb-0 me-auto">Welcome {{ authUser.name }}</p>
    <div class="d-flex gap-2">
      <!-- <RouterLink class="btn btn-outline-primary" to="/dashboard"
        >Dashboard</RouterLink
      >
      <RouterLink class="btn btn-outline-primary" to="/register-seller"
        >Register Seller</RouterLink
      >
      <RouterLink class="btn btn-outline-primary" to="/register-buyer"
        >Register Buyer</RouterLink
      > -->
      <button class="btn btn-primary" @click="logout">Logout</button>
    </div>
  </div>
</template>