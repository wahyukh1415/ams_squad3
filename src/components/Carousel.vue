<script setup>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import image1 from "../assets/images/carousel/4.png";
import image2 from "../assets/images/carousel/5.png";
import image3 from "../assets/images/carousel/3.png";
import image4 from "../assets/images/carousel/2.png";
import image5 from "../assets/images/carousel/1.png";

const slides = [
  { image: image1 },
  { image: image2 },
  { image: image3 },
  { image: image4 },
  { image: image5 },
];
</script>

<template>
  <Swiper
    :modules="[Autoplay, Navigation, Pagination]"
    :loop="true"
    :slidesPerView="1"
    :slidesPerGroup="1"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <img :src="slide.image" alt="slide" class="carousel-image" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
