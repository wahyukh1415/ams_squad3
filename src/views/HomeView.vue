<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import HomeActiveAuction from '@/components/HomeActiveAuction.vue';
import HomeComingAuction from '@/components/HomeComingAuction.vue';
import HomeEndedAuction from '@/components/HomeEndedAuction.vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import CreateAuctionButton from '@/components/CreateAuctionButton.vue';

import { RouterLink } from 'vue-router';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
    authCheck();
});
</script>

<template>
    <Navbar />
    <HomeActiveAuction />
    <HomeComingAuction />
    <HomeEndedAuction />
    <CreateAuctionButton />
    <Footer />
</template>

<style scoped></style>
