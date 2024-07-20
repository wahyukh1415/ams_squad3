import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useRegisterStore = defineStore("register", () => {

    const name = ref('');
    const email = ref('');
    const password = ref('');

    async function registerBuyer() {
        const auth = localStorage.getItem("token")
        const body = {
            name: name.value,
            email: email.value,
            password: password.value
        };
        try {
            const response = await axios.post('http://127.0.0.1:8080/secured/user/register-buyer',
                body, {
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            });
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    async function registerSeller() {
        const auth = localStorage.getItem("token")
        const body = {
            name: name.value,
            email: email.value,
            password: password.value
        };
        try {
            const response = await axios.post('http://127.0.0.1:8080/secured/user/register-seller',
                body, {
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            });
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    return {
        registerBuyer, registerSeller, name, email, password
    }

})