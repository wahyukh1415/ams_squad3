<script setup>
import { useAuctionStore } from "@/stores/auction";
import { storeToRefs } from "pinia";
import AuctionCard from "./AuctionCardActive.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';

const { activeAuctions } = storeToRefs(useAuctionStore());
const { openAuction } = useAuctionStore();
const onSwiper = (swiper) => {
  // console.log(swiper);
};
const onSlideChange = () => {
  // console.log('slide change');
};
const modules = [Navigation, Autoplay]
const breakpoints = {
  '768': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '992': {
    slidesPerView: 3,
    spaceBetween: 40,
  },
}
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
      <Swiper
        :modules="modules"
        :navigation="true"
        :slidesPerView="1"
        :space-between="12"
        :breakpoints="breakpoints"
        :loop="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange">
        <SwiperSlide v-for="auction in activeAuctions" :key="auction.id">
          <AuctionCard :content="auction" @detail-auction="openAuction"/>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
#active-auction {
  overflow-x: hidden;
}

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

.swiper {
  overflow: visible;
}

.swiper-button-prev,
.swiper-button-next {
  color: var(--color-primary-600) !important;
}

.swiper-slide {
  height: auto;
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

@media (min-width: 992px) {
  .heading {
    margin: 0 150px;
  }
}
</style>