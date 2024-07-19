<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onBeforeMount(() => {
    if(!localStorage.getItem('token') && !localStorage.getItem('auth-user')) {
        router.push({name: 'login'})
    }
})

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('auth-user')

    router.push({name: 'login'}).then(() => { router.go(0) })
}
</script>

<template>
    <h1>This is homepage</h1>
    <button class="btn btn-primary" @click="logout">Logout</button>
</template>