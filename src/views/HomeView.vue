<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

import HomeActiveAuction from "@/components/HomeActiveAuction.vue";
import HomeComingAuction from "@/components/HomeComingAuction.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import CreateAuctionButton from "@/components/CreateAuctionButton.vue";
import FAQ from "@/components/FaqTemp.vue";
import AuctionRules from "@/components/AuctionRules.vue";
import Carousel from "@/components/Carousel.vue";

import { RouterLink } from "vue-router";
import AuctionRulesVue from "@/components/AuctionRules.vue";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
  authCheck();
});
</script>

<template>
  <Navbar />
  <Carousel />
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
  <AuctionRules />
  <FAQ />
  <CreateAuctionButton v-if="authUser.role == 'SELLER'" />
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
