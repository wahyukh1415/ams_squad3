<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

async function registerSeller() {
    const auth = authUser.value.token;
    const body = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    try {
        const response = await axios.post(
            "http://127.0.0.1:8080/secured/user/register-seller",
            body,
            {
                headers: {
                    Authorization: auth,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error("Failed to register user");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}

onMounted(() => {
    authCheck();
});

const register = async () => {
    try {
        await registerSeller();
        console.log(authUser.value);
        alert("Berhasil Menambahkan Akun Seller");
        router.push("/dashboard");
    } catch (error) {
        alert("Gagal Membuat Akun Seller");
        console.log(error);
    }
};
</script>

<template>
    <div class="registerContainer my-5">
        <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
                <router-link to="/" class="breadcrumb-item text-decoration-none"
                    >Home</router-link
                >
                <router-link
                    to="/dashboard"
                    class="breadcrumb-item text-decoration-none"
                    >Dashboard</router-link
                >

                <a
                    class="breadcrumb-item active text-decoration-none"
                    aria-current="page"
                    >Register Seller</a
                >
            </ol>
        </nav>
        <h1 class="form-title">Tambah Akun Seller</h1>
        <form class="formRegister">
            <div class="form-group position-relative">
                <label for="username">Nama Seller</label>
                <input
                    type="text"
                    class="inputForm"
                    name="name"
                    v-model="name"
                    id="name"
                    placeholder="Masukkan Nama"
                />
            </div>
            <br />
            <div class="form-group position-relative">
                <label for="email">Email</label>
                <input
                    type="email"
                    class="inputForm"
                    name="email"
                    v-model="email"
                    id="email"
                    placeholder="Masukkan Email"
                />
            </div>
            <br />
            <div class="form-group position-relative">
                <label for="password">password</label>
                <input
                    type="password"
                    class="inputForm"
                    name="password"
                    v-model="password"
                    id="password"
                    placeholder="Masukkan password"
                />
            </div>
            <button class="btn btn-primary" @click.prevent="register">
                Buat Akun Seller
            </button>
        </form>
    </div>
    <Footer />
</template>

<style scoped>
.registerContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

nav {
    margin-left: -40rem;
}

.form-title {
    margin-bottom: 20px;
    font-weight: 900;
}

h4 {
    font-weight: 700;
    color: #1c5fa8;
}

a {
    text-decoration: none;
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

#form-modal {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 12px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
}
.form-group label {
    position: absolute;
    padding: 0 5px;
    font-size: 12px;
    top: -10px;
    left: 10px;
    background-color: white;
}
.form-group input {
    width: 100%;
    padding: 15px;
    margin-right: 150px;
    border: 1px solid black;
}

@media (min-width: 1024px) {
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>