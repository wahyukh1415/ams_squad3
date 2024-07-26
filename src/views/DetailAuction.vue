<script setup>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { usePriceStore } from "@/stores/price";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();
const router = useRouter();
const auction = ref([]);
const { formatPrice } = usePriceStore();
// Define the target date for the countdown
const targetDate = ref("");
const bidding = ref("");
const isDisabled = ref(false);

let data = localStorage.getItem("auth-user");
const dataUser = JSON.parse(data);
// Create a reactive reference to store the countdown values
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

// Function to calculate and update the countdown
const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate.value - now;

  if (distance < 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    clearInterval(interval);
    return;
  }

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const startedAuctionDate = computed(() => {
  return auction.value.startedAt ? formatDate(auction.value.startedAt) : "";
});

function formatDate(isoString) {
  const date = new Date(isoString);

  // Format the date to get the day of the week, day of the month, month name, and year
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format the time to get the hour and minute
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate} at ${formattedTime}`;
}

function auctionDuration(startDateString, endDateString) {
  // Parse the date strings into Date objects
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = endDate - startDate;

  // Convert milliseconds to hours
  const millisecondsPerHour = 1000 * 60 * 60;
  const differenceInHours = differenceInMilliseconds / millisecondsPerHour;

  return differenceInHours;
}

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
  getAuction();
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

async function getAuction() {
  await axios({
    method: "get",
    url: `http://127.0.0.1:8080/secured/auction/list/${router.currentRoute.value.query.id}`,
    headers: {
      Authorization: authUser.value.token,
    },
  }).then(function (response) {
    auction.value = response.data.data.auction;
    targetDate.value = new Date(auction.value.endedAt).getTime();
  });
}
console.log(auction.value.name);
// Create Bidding
async function createBidding() {
  const newData = {
    bidder: dataUser.id,
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
</script>
<template>
  <section id="detail-auction" class="bg-primary-50">
    <div class="container py-5">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb mb-2">
          <router-link to="/" class="breadcrumb-item">Home</router-link>
          <a class="breadcrumb-item active" aria-current="page">Details</a>
        </ol>
      </nav>
      <h1 class="fw-bold text-primary-950">
        {{ auction.name }}
      </h1>
      <div class="my-3">
        <span
          v-if="
            countdown.days +
              countdown.hours +
              countdown.minutes +
              countdown.seconds !==
            0
          "
          class="countdown px-2 py-1 border text-danger border-danger-subtle rounded-3"
        >
          Ends in : {{ countdown.hours }}h {{ countdown.minutes }}m
          {{ countdown.seconds }}s
        </span>
        <span
          v-else
          class="countdown px-2 py-1 border text-danger border-danger-subtle rounded-3"
        >
          Auction closed
        </span>
      </div>
      <div class="row">
        <div class="col-sm-8 col-md-9 mb-4 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-heading text-primary-600">Overview</h5>
              <p>
                {{ auction.description }}
              </p>
              <h5 class="card-heading text-primary-600">Starting price</h5>
              <p>{{ formatPrice(auction.minimumPrice) }}</p>
              <h5 class="card-heading text-primary-600">Auction time</h5>
              <p>
                {{ startedAuctionDate }} ({{
                  Math.round(
                    auctionDuration(auction.startedAt, auction.endedAt)
                  )
                }}
                Hours)
              </p>
            </div>
          </div>
        </div>

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
          <div v-else>
            <p class="mb-1 fw-bold">Highest bid</p>
            <div class="bidder">
              <p class="highest-bidder">
                There are no bids on this auction yet
              </p>
            </div>
          </div>
          <div class="form-bidder">
            <form
              action=""
              class="d-flex flex-column gap-2"
              @submit.prevent="createBidding"
            >
              <label for="bidder" class="fw-bold text-primary"
                >Enter Your ID</label
              >
              <div class="input-group flex-nowrap">
                <input
                  type="number"
                  name="bidder"
                  id="bidder"
                  class="form-control"
                  placeholder="E.g., 123456789"
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
                :class="isDisabled ? ' btn-blok ' : 'btn-primary'"
                class="btn w-100 rounded-2"
                :disabled="isDisabled"
              >
                Bid Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<style scoped>
#detail-auction {
  min-height: 100dvh;
}

.breadcrumb-item {
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb-item.active {
  cursor: default;
}

.card-heading {
  font-size: large;
  font-weight: 600;
}

.countdown {
  background-color: #fef2f2;
}

.highest-bid {
  font-size: x-large;
  font-weight: 700;
}

.highest-bidder {
  font-size: small;
}
.btn-blok {
  cursor: not-allowed;
  pointer-events: none;
}
</style>
