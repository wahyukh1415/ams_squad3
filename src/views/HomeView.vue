<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck, logout } = useAuthStore();

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div class="p-4 d-flex align-items-center">
        <h1 class="w-100">Welcome {{ authUser.name }}, this is homepage</h1>
        <div>
            <button class="btn btn-primary" @click="logout">Logout</button>
            <button class="btn btn-primary" @click="logout">conflict</button>
        </div>
        <div>
            <button class="btn btn-warning">Colek Rehan</button>
            <button class="btn btn-secondary">Colek Colek Sony</button>
        </div>
    </div>
</template>
