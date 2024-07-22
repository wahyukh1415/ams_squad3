<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  content: {
    type: Object,
    default: {
      name: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi similique architecto nostrum nisi asperiores repellendus sit dicta tenetur sunt quas! Eum eveniet fugit corporis, ea fuga debitis vel quaerat similique?',
      endedAt: '2024-08-16T05:00:00Z'
    }
  }
});

const emit = defineEmits(["detailAuction"]);

function showDetail(content) {
  emit("detailAuction", content);
}

function formatPrice(value) {
  if (typeof value !== "number") {
    return value;
  }
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

// Define the target date for the countdown
const targetDate = new Date(props.content.endedAt).getTime();

// Create a reactive reference to store the countdown values
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

// Function to calculate and update the countdown
const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    clearInterval(interval);
    return;
  }

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  };
};

function ucwords (str) {
    return (str.toLowerCase()).replace(/^([a-z])|\s+([a-z])/g, function (value) {
        return value.toUpperCase();
    });
}

// Set up the interval to update the countdown every second
let interval;
onMounted(() => {
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

// Clear the interval when the component is unmounted
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="card position-relative h-100 border-0" @click="showDetail(content)">
    <div class="card-header border-0">
      <div class="row">
        <div class="header-text col-4">Ends in</div>
        <div class="header-text col-8 text-end">
          {{ countdown.hours }}h {{ countdown.minutes }}m {{ countdown.seconds }}s
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-secondary">{{ ucwords(content.name) }}</h5>
      <div class="card-text">
        <p class="mb-0">
          {{ content.description }}
        </p>
      </div>
    </div>
    <div class="card-footer border-0 pt-0 bg-white text-secondary text-end">
      <div class="row">
        <p class="mb-0 text-start text-sm-end col-6 col-sm-12">
          Starting price :
        </p>
        <p class="card-price mb-0 text-end col-6 col-sm-12">
          {{ formatPrice(content.minimumPrice) }}
        </p>
      </div>
      <div class="row mt-2">
        <p class="mb-0 text-start text-sm-end col-6 col-sm-12">
          Highest Bid :
        </p>
        <p class="card-price mb-0 text-end col-6 col-sm-12">
          {{ content.highestBid !== 0 ? formatPrice(content.highestBid) : '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.card-header {
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.header-text {
  font-weight: 600;
}

.card-text {
  font-size: small;
}

.card-title {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.card-price {
  font-weight: 700;
  color: var(--color-primary-800);
}
</style>