<script setup>
import AuctionCard from "@/components/AuctionCard.vue";
</script>

<template>
    <section class="py-5 bg-primary">
        <div class="container">
        <div class="text-center text-white mb-4">
            <h1 class="section-title mb-0">Active Auction</h1>
            <h5>Don't Miss Out on Unique Items!</h5>
        </div>
          <div class="row gy-4 gx-4">
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <AuctionCard />
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