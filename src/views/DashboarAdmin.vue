<script setup>
import User from '../components/tableUser.vue';
import ListAuction from '../components/tableAuction.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const { authCheck, logout } = useAuthStore();

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div class="container">
        <h1>Dashboar Admin</h1>
        <User />
        <br />
        <h4>List Auction</h4>
        <ListAuction />
    </div>
</template>
