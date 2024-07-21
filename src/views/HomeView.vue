<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

import HomeActiveAuction from "@/components/HomeActiveAuction.vue";
import HomeComingAuction from "@/components/HomeComingAuction.vue";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
  authCheck();
});
</script>

<template>
  <!-- ini bukan navbar, nanti diganti navbar -->
  <div class="bg-primary-700">
    <div class="container py-4 d-flex align-items-center">
      <p class="fw-semibold text-white mb-0 me-auto">
        Welcome {{ authUser.name }}, this is homepage
      </p>
      <div class="d-flex gap-2">
        <button class="btn btn-light" @click="logout">Logout</button>
      </div>
    </div>
  </div>
  <!-- --- -->
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