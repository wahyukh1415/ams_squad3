<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import HomeActiveAuction from '@/components/HomeActiveAuction.vue';
import HomeComingAuction from '@/components/HomeComingAuction.vue';
import HomeEndedAuction from '@/components/HomeEndedAuction.vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

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
    <router-link to="/create-auction" class="btn btn-primary cta-seller d-flex flex-row align-items-center" style="right: 0; bottom: 0; position: fixed; margin: 30px; cursor: pointer; z-index: 999; border: 1px solid #1c5fa8">
        <i class="bi bi-plus-circle-fill icon-auction" style="font-size: 30px"></i>
        <span class="ms-2">Create New Auction</span>
    </router-link>
    <Footer />
</template>
