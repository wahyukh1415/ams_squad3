<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div class="cta-wrapper">
        <router-link to="/create-auction" class="btn btn-primary cta-seller">
            <i class="bi bi-plus-circle-fill icon-auction"></i>
            <span class="ms-2">Create New Auction</span>
        </router-link>
    </div>
</template>

<style scoped>
.cta-seller {
    display: flex;
    flex-direction: row;
    align-items: center;
    right: 0;
    bottom: 0;
    position: fixed;
    margin: 30px;
    cursor: pointer;
    z-index: 999;
    border: 1px solid #1c5fa8;
}

.icon-auction {
    font-size: 30px;
}
</style>
