<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function registerBuyer() {
    const auth = authUser.value.token;
    const body = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    try {
        const response = await axios.post('http://127.0.0.1:8080/secured/user/register-buyer', body, {
            headers: {
                Authorization: auth,
            },
        });
        // if (response.status === 200 || response.status === 201) {
        //     console.log(response.data);
        //     return response.data;
        // } else {
        //     throw new Error('Failed to register user');
        // }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

onMounted(() => {
    authCheck();
});

const register = async () => {
    try {
        await registerBuyer();
        alert('Berhasil Menambahkan Akun Buyer');
        router.push('/register-buyer');
    } catch (error) {
        alert('Gagal Membuat Akun Buyer');
        console.log(error);
    }
};
</script>

<template>
    <div class="registerContainer">
        <div class="cardRegister">
            <div class="back d-flex flex-column">
                <router-link class="homeLink" to="/"><i class="bi bi-arrow-left-circle-fill"></i></router-link>
                <img src="../assets/register.svg" alt="Register Icon" />
            </div>
            <form class="formRegister form-2">
                <h4>Tambah Akun Buyer</h4>
                <div class="inputWrapper">
                    <div for="name" class="labelForm">Nama Buyer: <span class="required">*</span></div>
                    <input type="text" class="inputForm" name="name" v-model="name" id="name" placeholder="Masukkan Nama" />
                </div>
                <div class="inputWrapper">
                    <div for="email" class="labelForm">Email Buyer: <span class="required">*</span></div>
                    <input type="email" class="inputForm" name="email" v-model="email" id="email" placeholder="Masukkan Email" />
                </div>
                <div class="inputWrapper">
                    <div for="password" class="labelForm">Password Buyer: <span class="required">*</span></div>
                    <input type="password" class="inputForm" name="password" v-model="password" id="password" placeholder="Masukkan Password" />
                </div>
                <button class="btn btn-primary" @click.prevent="register">Buat Akun Buyer</button>
                <div class="divider">atau</div>
                <router-link to="/register-seller">
                    <a href="#" id="linkSeller">Buat Akun Seller</a>
                </router-link>
            </form>
        </div>
    </div>
</template>

<style scoped>
.registerContainer {
    background-color: #1c5fa8;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}

.cardRegister {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    border-radius: 15px;
    background-color: #f8f9fb;
    padding: 50px;
    height: 600px;
    width: 1000px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px 5px;
}

.homeLink {
    left: 0;
    width: 50px;
    text-align: left;
    cursor: pointer;
    font-size: 30px;
}

img {
    width: 450px;
    height: 450px;
}

.formRegister {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    gap: 10px;
    height: 450px;
    width: 450px;
}

h4 {
    font-weight: 700;
    color: #1c5fa8;
}

a {
    text-decoration: none;
}

.labelForm {
    text-align: left;
    padding-left: 3px;
}

.required {
    color: red;
}

.inputWrapper {
    padding: 5px;
    border: 1px solid #b6b6b6;
    border-radius: 13px;
}

.inputForm {
    width: 100%;
    border: none;
    background-color: #f8f9fb;
    border-radius: 10px;
}

.buttonDaftar {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.btn {
    margin-top: 30px;
    width: 100%;
}

@media (min-width: 1024px) {
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
