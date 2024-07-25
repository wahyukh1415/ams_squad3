<template>
  <div class="col-sm-4 col-md-3">
    <div v-if="auction.highestBidderName">
      <p class="mb-1 fw-bold">Highest bid</p>
      <div class="bidder">
        <p class="highest-bid mb-0 text-primary-600">
          {{ formatPrice(auction.highestBid) }}
        </p>
        <p class="highest-bidder">By : {{ auction.highestBidderName }}</p>
      </div>
    </div>
    <div class="form-bidder">
      <form
        action=""
        class="d-flex flex-column gap-2"
        @submit.prevent="createBidding"
      >
        <label for="bidder">Enter Your ID</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Rp</span>
          <input
            type="text"
            name="bidder"
            id="bidder"
            class="form-control"
            placeholder="Enter your Id"
            aria-label="bidder"
            v-model="bidder"
            aria-describedby="addon-wrapping"
          />
        </div>
        <label for="bidding" class="fw-bold text-primary"
          >Start Bidding Here:</label
        >
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Rp</span>
          <input
            type="text"
            name="bidding"
            id="bidding"
            class="form-control"
            :placeholder="auction.highestBid"
            aria-label="bidding"
            v-model="bidding"
            aria-describedby="addon-wrapping"
          />
        </div>
        <button
          type="submit"
          :class="isDisabled ? 'btn-secondary btn-anjing ' : 'btn-primary'"
          class="btn w-100 rounded-2"
          :disabled="isDisabled"
        >
          Bid Now
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { usePriceStore } from "@/stores/price";
import { defineProps } from "vue";
const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();
const router = useRouter();
const auction = ref([]);
const { formatPrice } = usePriceStore();

const bidder = ref("");
const bidding = ref("");
const isDisabled = ref(false);

let data = localStorage.getItem("auth-user");
const dataUser = JSON.parse(data);

const disabled = () => {
  if (dataUser.role !== "BUYER") {
    isDisabled.value = true;
  }
};
// Set up the interval to update the countdown every second
let interval;
onMounted(() => {
  disabled();
  authCheck();
});
console.log(auction);

// Create Bidding
async function createBidding() {
  const newData = {
    bidder: parseInt(bidder.value),
    bid: parseInt(bidding.value),
  };
  try {
    const response = await axios.post(
      `http://127.0.0.1:8080/secured/auction/list/${router.currentRoute.value.query.id}`,
      newData,
      {
        headers: {
          Authorization: dataUser.token,
        },
      }
    );
    alert("Congratulations! Your bid has been successfully placed.");
    location.reload();
  } catch (error) {
    console.error("Error creating bidding:", error);
  }
}

console.log(auction.value);
console.log(auction);
</script>

<style scoped></style>
