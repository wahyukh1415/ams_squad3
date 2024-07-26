<script setup>
import { computed } from 'vue'
import { useAuctionStore } from "@/stores/auction";
import { storeToRefs } from "pinia";
import AuctionCard from "./AuctionCardComing.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-cards';

const { comingAuctions } = storeToRefs(useAuctionStore());
const { openAuction } = useAuctionStore();

const modules = [Autoplay, EffectCards]
const loop = computed(() => 
  comingAuctions.value.length < 2 ? false : true
)
</script>

<template>
  <section id="coming-auction" class="py-5 bg-primary-600">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 text-start text-white d-flex align-items-center">
          <div>
            <h1 class="section-title text-white my-0 pe-5">
              Upcoming Auctions and New Bidding Opportunities
            </h1>
            <div class="align-items-center">
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
        </div>
        <div class="col-12 col-md-6">
          <div class="px-md-5">
            <Swiper
              :modules="modules"
              :effect="'cards'"
              :slidesPerView="1"
              :spaceBetween="12"
              :grabCursor="true"
              :loop="loop"
              :autoplay="{
                delay: 2000,
                disableOnInteraction: false,
              }">
              <SwiperSlide v-for="auction in comingAuctions" :key="auction.id">
                <AuctionCard :content="auction" @detail-auction="openAuction"/>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#coming-auction {
  overflow: hidden;
}

.section-title {
  font-weight: 700;
  letter-spacing: 0.2px;
}
</style>