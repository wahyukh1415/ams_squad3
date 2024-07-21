<script setup>
import { useAuctionStore } from "@/stores/auction";
import { storeToRefs } from "pinia";
import AuctionCard from "./AuctionCard.vue";

const { comingAuctions } = storeToRefs(useAuctionStore());
const { openAuction } = useAuctionStore();
</script>

<template>
  <section class="py-5 bg-primary-200">
    <div class="container">
      <div class="text-center text-white mb-4">
        <h1 class="section-title text-primary mb-0">Coming Soon</h1>
        <h5>Don't Miss Out on Unique Items!</h5>
      </div>
      <div class="row gy-4 gx-4">
        <div
          v-for="auction in comingAuctions"
          :key="auction.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <AuctionCard
            :type="'coming-soon'"
            :content="auction"
            @detail-auction="openAuction"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  font-weight: 900;
  letter-spacing: 4px;
}
</style>