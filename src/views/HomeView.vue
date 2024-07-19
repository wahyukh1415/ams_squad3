<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authUser = ref(JSON.parse(localStorage.getItem('auth-user')))

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
    <h1>Welcome {{ authUser.name }}, this is homepage</h1>
    <button class="btn btn-primary" @click="logout">Logout</button>
</template>