<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import Footer from "@/components/Footer.vue";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const name = ref("");
const description = ref("");
const minimumPrice = ref("");
const startedAt = ref("");
const endedAt = ref("");
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
        const response = await axios.post(
            "http://127.0.0.1:8080/secured/auction/create",
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

const create = async () => {
    try {
        await createAuction();
        alert("Berhasil Membuat Lelang Baru");
        router.push("/");
    } catch (error) {
        alert("Gagal Membuat Lelang Baru");
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
                <a
                    class="breadcrumb-item active text-decoration-none"
                    aria-current="page"
                    >Create New Auction</a
                >
            </ol>
        </nav>
        <h1 class="form-title">Create New Auction</h1>
        <form class="formRegister">
            <div class="form-group position-relative">
                <label for="name">Auction Name</label>
                <input
                    type="text"
                    class="inputForm"
                    name="name"
                    v-model="name"
                    id="name"
                    placeholder="Name auction..."
                />
            </div>
            <div class="form-group position-relative">
                <label for="description">Auction Description</label>
                <input
                    type="text"
                    class="inputForm"
                    name="description"
                    v-model="description"
                    id="description"
                    placeholder="Description..."
                />
            </div>
            <div class="form-group position-relative">
                <label for="minimumPrice">Minimum Price</label>
                <input
                    type="number"
                    class="inputForm"
                    name="minimumPrice"
                    v-model="minimumPrice"
                    id="minimumPrice"
                    placeholder="100.000.000"
                />
            </div>
            <div class="form-group position-relative">
                <label for="startedAt">Auction Start Time</label>
                <input
                    type="datetime-local"
                    class="inputForm"
                    name="startedAt"
                    v-model="startedAt"
                    id="startedAt"
                    placeholder="Date Start"
                />
            </div>
            <div class="form-group position-relative">
                <label for="endedAt">Auction End Time</label>
                <input
                    type="datetime-local"
                    class="inputForm"
                    name="endedAt"
                    v-model="endedAt"
                    id="endedAt"
                    placeholder="Date End"
                />
            </div>
            <button class="btn btn-primary" @click.prevent="create">
                Create Auction
            </button>
        </form>
    </div>
    <Footer />
</template>

<style scoped>
nav {
    margin-left: -40rem;
}
.registerContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-top: 10px;
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
