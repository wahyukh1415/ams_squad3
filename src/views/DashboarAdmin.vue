<script setup>
import User from "../components/tableUser.vue";
import ListAuction from "../components/tableAuction.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

const { authCheck, logout } = useAuthStore();

onMounted(() => {
  authCheck();
});
</script>

<template>
  <div>
    <Navbar />
    <div class="container">
      <h1>Dashboar Admin</h1>
      <h4>List User</h4>
      <User />
      <br />
      <h4>List Auction</h4>
      <ListAuction />
    </div>
    <Footer />
  </div>
</template>
