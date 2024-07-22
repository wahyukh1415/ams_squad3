<script setup>
import Logo from './logo/Logo.vue';

const props = defineProps({
  content: {
    type: Object,
  },
});

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

function formatDate(isoString) {
  const date = new Date(isoString);
  
  // Format the date to get the day of the week, day of the month, month name, and year
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Format the time to get the hour and minute
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate} at ${formattedTime}`;
}

function ucwords(str) {
  return str.toLowerCase().replace(/^([a-z])|\s+([a-z])/g, function (value) {
    return value.toUpperCase();
  });
}
</script>

<template>
  <!-- Coming Soon -->
  <div class="card h-100 border-0">
    <div class="card-body pb-0 text-center">
      <Logo class="logo mb-3 text-primary-200"/>
      <h5 class="card-title mb-1 text-secondary">
        {{ ucwords(content.name) }}
      </h5>
      <div class="card-text">
        <p class="mb-0">
          {{ content.description }}
        </p>
      </div>
    </div>
    <div class="card-footer border-0 pt-0 bg-white text-secondary text-center">
      <hr class="dashed-hr my-3" />
      <div class="row">
        <p class="my-0 col-6 col-sm-12">Starting price :</p>
        <p class="card-price col-6 col-sm-12">
          {{ formatPrice(content.minimumPrice) }}
        </p>
      </div>
      <div class="row card-text">
        <p class="mb-0 text-primary-600 fw-bold">
          {{ formatDate(content.startedAt) }}
        </p>
        <p class="mb-0">
          Auction duration : {{ Math.round(auctionDuration(content.startedAt, content.endedAt)) }} Hours
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
  cursor: grab;
}

.logo {
  width: 120px;
  height: auto;
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

.dashed-hr {
  border-top: 1.5px dashed rgba(0, 0, 0, 0.5);
}
</style>