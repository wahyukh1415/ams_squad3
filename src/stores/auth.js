import { defineStore } from "pinia";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const authUser = reactive({});

    function authCheck() {
        if (localStorage.getItem('auth-user')) {
            Object.assign(authUser, JSON.parse(localStorage.getItem('auth-user')))
        } else {
            router.push({ name: 'login' }).then(() => {
                router.go(0);
            });
        }
    }

    function logout() {
        localStorage.removeItem('auth-user');
    
        router.push({ name: 'login' })
        .then(() => {
            router.go(0);
        });
    }

    return { authUser, authCheck, logout }
})