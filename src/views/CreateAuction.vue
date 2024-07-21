<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const name = ref('');
const description = ref('');
const minimumPrice = ref('');
const startedAt = ref('');
const endedAt = ref('');
const router = useRouter();

async function createAuction() {
    const auth = authUser.value.token;
    const body = {
        name: name.value,
        description: description.value,
        minimumPrice: minimumPrice.value,
        startedAt: new Date(startedAt.value).toISOString(),
        endedAt: new Date(endedAt.value).toISOString(),
    };
    try {
        const response = await axios.post('http://127.0.0.1:8080/secured/auction/create', body, {
            headers: {
                Authorization: auth,
            },
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

onMounted(() => {
    authCheck();
});

const create = async () => {
    try {
        await createAuction();
        alert('Berhasil Membuat Lelang Baru');
        router.push('/');
    } catch (error) {
        alert('Gagal Membuat Lelang Baru');
        console.log(error);
    }
};
</script>

<template>
    <div class="registerContainer">
        <div class="cardRegister">
            <div class="back d-flex flex-column">
                <router-link class="homeLink" to="/"><i class="bi bi-arrow-left-circle-fill"></i></router-link>
                <img src="../assets/auction.svg" alt="Register Icon" />
            </div>
            <form class="formRegister form-2">
                <h4>Formulir Lelang Baru</h4>
                <div class="inputWrapper">
                    <div for="name" class="labelForm">Nama Lelang: <span class="required">*</span></div>
                    <input type="text" class="inputForm" name="name" v-model="name" id="name" placeholder="Nama Lelang..." />
                </div>
                <div class="inputWrapper">
                    <div for="description" class="labelForm">Deskripsi: <span class="required">*</span></div>
                    <input type="text" class="inputForm" name="description" v-model="description" id="description" placeholder="Deskripsi Lelang..." />
                </div>
                <div class="inputWrapper">
                    <div for="minimumPrice" class="labelForm">Harga Minimum: <span class="required">*</span></div>
                    <input type="number" class="inputForm" name="minimumPrice" v-model="minimumPrice" id="minimumPrice" placeholder="100.000.000" />
                </div>
                <div class="inputWrapper">
                    <div for="startedAt" class="labelForm">Tanggal Mulai: <span class="required">*</span></div>
                    <input type="datetime-local" class="inputForm" name="startedAt" v-model="startedAt" id="startedAt" placeholder="Tanggal Mulai" />
                </div>
                <div class="inputWrapper">
                    <div for="endedAt" class="labelForm">Tanggal Selesai: <span class="required">*</span></div>
                    <input type="datetime-local" class="inputForm" name="endedAt" v-model="endedAt" id="endedAt" placeholder="Tanggal Selesai" />
                </div>
                <button class="btn btn-primary" @click.prevent="create">Tambah Lelang Baru</button>
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
