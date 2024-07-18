import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useLoginStore = defineStore('login', () => {
    const email = ref('');
    const password = ref('');
    const hidePassword = ref(true);
    const emailError = ref('');
    const passwordError = ref('');

    const passwordFieldIcon = computed(() => hidePassword.value ? "bi-eye" : "bi-eye-slash");
    const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");
    
    function authenticate() {
        if(!emailError && !passwordError) {
            alert('login');
        }
    };

    return { email, password, hidePassword, passwordFieldIcon, passwordFieldType, emailError, passwordError, authenticate };
});