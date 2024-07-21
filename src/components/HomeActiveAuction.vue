<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuctionStore } from "@/stores/auction";
import { storeToRefs } from "pinia";
import AuctionCard from "./AuctionCardActive.vue";

const { activeAuctions } = storeToRefs(useAuctionStore());
const { openAuction } = useAuctionStore();

const sectionElement = ref(null);
const pageWidth = ref(0);
const scrollContainer = ref(null);

const updatePageWidth = () => {
  if (sectionElement.value && sectionElement.value.getBoundingClientRect) {
    pageWidth.value = sectionElement.value.getBoundingClientRect().width;
  }
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -pageWidth.value,
      behavior: "smooth",
    }); // Adjust 'left' value as needed
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: pageWidth.value,
      behavior: "smooth",
    }); // Adjust 'left' value as needed
  }
};

onMounted(() => {
  updatePageWidth();
  window.addEventListener("resize", updatePageWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePageWidth);
});
</script>

<template>
  <section id="active-auction" class="py-5 bg-primary-50 position-relative">
    <div class="container">
      <div class="heading text-center text-white mb-4">
        <h5 class="section-sub-title mb-0 text-primary-500">Don't Miss Out!</h5>
        <h1 class="section-title my-0 text-primary-950">
          Discover endless treasures and unbeatable deals
        </h1>
        <p class="paragraph text-secondary">
          Discover amazing deals and rare finds on Bidbuddy! Place your bids now
          and seize exclusive deals and rare finds. Every bid brings you closer
          to your next great treasure. Act fast and win big!
        </p>
      </div>
    </div>
    <div class="position-relative">
      <div class="scroll-button left-button">
        <button class="btn btn-lg btn-primary" @click="scrollLeft">
          <i class="bi bi-chevron-left"></i>
        </button>
      </div>
      <div class="x-scrolling-wrapper" ref="scrollContainer">
        <div class="row position-relative">
          <div class="col-12">
            <div
              class="row flex-row flex-nowrap mt-4 pb-4 pt-2"
              ref="sectionElement"
            >
              <div
                class="component col-12 col-sm-6 col-md-4"
                v-for="auction in activeAuctions"
                :key="auction.id"
              >
                <AuctionCard
                  :content="auction"
                  @detail-auction="openAuction"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-button right-button">
        <button class="btn btn-lg btn-primary" @click="scrollRight">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
#active-auction::before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: url("../assets/images/world-map-design.png");
  background-repeat: no-repeat;
  background-position: 50% calc(-130px - 1.5vw);
  background-size: cover;
}

.x-scrolling-wrapper {
  overflow-x: hidden;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.scroll-button .btn {
  padding: 20px;
}

.left-button {
  left: 20px;
}

.right-button {
  right: 20px;
}

.section-title {
  font-weight: 800;
  letter-spacing: 0.2px;
}

.section-sub-title {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.paragraph {
  margin: 20px 0;
}

.heading {
  margin: 0 50px;
}

.component:first-child {
  margin-left: 12px;
}

.component:last-child {
  margin-right: 12px;
}

@media (min-width: 576px) {
  .component:first-child {
    margin-left: 50px;
  }
  
  .component:last-child {
    margin-right: 50px;
  }
}

@media (min-width: 992px) {
  .heading {
    margin: 0 150px;
  }
}
</style>