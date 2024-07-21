<script setup>
import { onMounted, reactive, computed } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import AuctionCard from "@/components/AuctionCard.vue";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();
const auctions = reactive([]);

const activeAuctions = computed(() => {
  return auctions.filter(
    (auction) =>
      auction.status === "APPROVED" && isDatePassed(auction.startedAt)
  );
});

const comingAuctions = computed(() => {
  return auctions.filter(
    (auction) =>
      auction.status === "APPROVED" && !isDatePassed(auction.startedAt)
  );
});

const endedAuctions = computed(() => {
  return auctions.filter(
    (auction) =>
      auction.status === "APPROVED" && isDatePassed(auction.endedAt)
  );
});

onMounted(() => {
  authCheck();
  getAuction();
});

async function getAuction() {
  await axios({
    method: "get",
    url: "http://127.0.0.1:8080/secured/auction/list?page=1&size=100",
    headers: {
      Authorization: authUser.value.token,
    },
  }).then(function (response) {
    auctions.push(...response.data.data);
  });
}

function action(auction) {
  alert(auction.name);
}

function isDatePassed(date) {
  const givenDate = new Date(date);
  const currentDate = new Date();

  return currentDate > givenDate;
}
</script>

<template>
  <section class="py-5 bg-primary">
    <div class="container">
      <div class="text-center text-white mb-4">
        <h1 class="section-title mb-0">Active Auctions</h1>
        <h5>Don't Miss Out on Unique Items!</h5>
      </div>
      <div class="row gy-4 gx-4">
        <div
          v-for="auction in activeAuctions"
          :key="auction.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <AuctionCard
            :type="'active'"
            :content="auction"
            @detail-auction="action"
          />
        </div>
      </div>
    </div>
  </section>
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
            @detail-auction="action"
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