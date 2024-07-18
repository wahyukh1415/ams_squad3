import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useLoginStore = defineStore('login', () => {
    const email = ref('');
    const password = ref('');
    const hidePassword = ref(true);
    const isValidEmail = ref(true);
    const isValidPassword = ref(true);

    const passwordFieldIcon = computed(() => hidePassword.value ? "bi-eye" : "bi-eye-slash");
    const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");
    
    function authenticate() {
        if(email.value !== '' && password.value !== '' && isValidEmail.value) {
            alert('login');
        }
    };

    return { email, password, hidePassword, passwordFieldIcon, passwordFieldType, isValidEmail, isValidPassword, authenticate };
});