<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import ListAuction from '@/components/HomeListAuction.vue'

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div class="container py-4 d-flex align-items-center">
        <p class="fw-semibold w-100 mb-0">Welcome {{ authUser.name }}, this is homepage</p>
        <div>
            <button class="btn btn-primary" @click="logout">Logout</button>
        </div>
    </div>
    <ListAuction/>
</template>
