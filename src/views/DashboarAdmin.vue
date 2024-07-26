<script setup>
import User from "../components/tableUser.vue";
import ListAuction from "../components/tableAuction.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import { storeToRefs } from "pinia";
import CreateAuctionButton from "@/components/CreateAuctionButton.vue";

const { authCheck, logout } = useAuthStore();
const { authUser } = storeToRefs(useAuthStore());

onMounted(() => {
    authCheck();
});
</script>

<template>
    <div>
        <main class="container">
            <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
                <ol class="breadcrumb mb-2">
                    <router-link
                        to="/"
                        class="breadcrumb-item text-decoration-none"
                        >Home</router-link
                    >
                    <a
                        class="breadcrumb-item active text-decoration-none"
                        aria-current="page"
                        >Dashboard</a
                    >
                </ol>
            </nav>
            <h1 class="fw-bold">Dashboar Admin</h1>

            <h4>List User</h4>
            <User />
            <br />
            <h4>List Auction</h4>
            <ListAuction />
        </main>
        <Footer />
    </div>
</template>

<style scoped>
.container {
    margin-top: 20px;
}

.head-dashboard {
    margin-left: -45px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 10px;
}

h1 {
    padding-top: 2px;
}

i {
    font-size: 35px;
}
</style>
