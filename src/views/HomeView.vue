<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authUser = ref(JSON.parse(localStorage.getItem('auth-user')));

onMounted(() => {
    if (!localStorage.getItem('token') && !localStorage.getItem('auth-user')) {
        router.push({ name: 'login' });
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user');

    router.push({ name: 'login' }).then(() => {
        router.go(0);
    });
}
</script>

<template>
    <div class="p-4 d-flex align-items-center">
        <h1 v-if="authUser" class="w-100">Welcome {{ authUser.name }}, this is homepage</h1>
        <div>
            <button class="btn btn-primary" @click="logout">Logout</button>
            <button class="btn btn-primary" @click="logout">conflict</button>
        </div>
        <div>
            <button class="btn btn-primary">Colek Rehan</button>
            <button class="btn btn-info">Colek Sony</button>
        </div>
    </div>
</template>
