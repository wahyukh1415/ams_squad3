<script setup>
import User from '../components/tableUser.vue';
import ListAuction from '../components/tableAuction.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import { storeToRefs } from 'pinia';

const { authCheck, logout } = useAuthStore();
const { authUser } = storeToRefs(useAuthStore());
const role = authUser.value.role;

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div class="container" v-if="role === 'ADMIN'">
        <h1>Dashboar Admin</h1>
        <h4>List User</h4>
        <User />
        <br />
        <h4>List Auction</h4>
        <ListAuction />
        <Footer />
    </div>
    <div class="container" v-else>
        <h1>Maaf Yaaa {{ role }}</h1>
        <h1>Halaman hanya bisa dilihat oleh admin</h1>
    </div>
</template>
