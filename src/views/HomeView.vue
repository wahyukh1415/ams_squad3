<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

import HomeActiveAuction from '@/components/HomeActiveAuction.vue';
import HomeComingAuction from '@/components/HomeComingAuction.vue';
import Footer from '@/components/Footer.vue';

import { RouterLink } from 'vue-router';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
  authCheck();
});
</script>

<template>
  <section id="hero" class="container">
    <div class="row px-4 px-md-0">
      <h1 class="heading col-12 col-md-6">Bids Beyond Boundaries</h1>
      <div class="col-12 col-md-6 ps-md-5 d-flex align-items-center">
        <div>
          <p class="paragraph text-secondary">
            Discover new auctions, place your bids, and uncover unique
            treasures. Dive in now to explore exciting opportunities and win big
            rewards!
          </p>
          <a class="btn btn-primary" href="#active-auction">Explore now</a>
        </div>
      </div>
    </div>
  </section>
  <HomeActiveAuction />
  <HomeComingAuction />
    <router-link to="/create-auction" class="btn btn-primary cta-seller d-flex flex-row align-items-center" style="right: 0; bottom: 0; position: fixed; margin: 30px; cursor: pointer; z-index: 999; border: 1px solid #1c5fa8">
        <i class="bi bi-plus-circle-fill icon-auction" style="font-size: 30px"></i>
        <span class="ms-2">Create New Auction</span>
    </router-link>
    <Footer />
</template>

<style scoped>
#hero {
  padding: 6rem 0;
}

.heading {
  font-weight: 900;
  font-size: calc(2rem + 1.5vw);
}

.paragraph {
  font-weight: 600;
}
</style>