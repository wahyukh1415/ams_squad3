<script setup>
import { useAuctionStore } from "@/stores/auction";
import { storeToRefs } from "pinia";
import AuctionCard from "./AuctionCardComing.vue";

const { comingAuctions } = storeToRefs(useAuctionStore());
const { openAuction } = useAuctionStore();
</script>

<template>
  <section id="coming-auction" class="py-5 bg-primary-600">
    <div class="container">
      <div class="text-start text-white mb-4 row">
        <h1 class="section-title text-white my-0 pe-5 col-6">
          Upcoming Auctions and New Bidding Opportunities
        </h1>
        <div class="d-flex align-items-center ps-5 col-6">
          <div class="paragraph">
            <hr class="w-25 border-3" />
            <p>
              Stay ahead of the game with our upcoming auctions. Discover the
              latest opportunities to place your bids on new and exciting items.
              Check back often so you don’t miss out!
            </p>
          </div>
        </div>
      </div>
      <div class="row gy-4 gx-4">
        <div
          v-for="auction in comingAuctions"
          :key="auction.id"
          class="col-12"
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
  font-weight: 700;
  letter-spacing: 0.2px;
}
</style>