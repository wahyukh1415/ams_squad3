<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";
const { authUser } = storeToRefs(useAuthStore());
import ProfileSettings from "../components/ProfileSettings.vue";
</script>

<template>
  <Navbar />
  <div class="wrapper-profile">
    <div class="jumbroton d-flex flex-column align-items-center">
      <div
        class="image-profile h-100 d-flex gap-3 justify-content-center flex-column align-items-center"
      >
        <img
          class="rounded-circle"
          src="../assets//images/profile-image.jpg"
          width="100"
          height="100"
          alt="profile-image"
        />
        <h2>{{ authUser.name }}</h2>
      </div>
      <ul class="list-profile d-flex gap-5">
        <li v-if="authUser.role === 'SELLER'">Selling</li>
        <li v-else-if="authUser.role === 'BUYER'">Bidding</li>
        <li v-else>Dashboard</li>
        <li>Interest</li>
        <li class="active">Settings</li>
      </ul>
    </div>
    <!-- settings section -->
    <ProfileSettings />
    <!-- akhir settings -->
  </div>
</template>

<style scoped>
li {
  list-style: none;
}
ul {
  padding: 0;
}
.wrapper-profile {
  padding-top: 63px;
  font-family: "Poppins", sans-serif;
}

.jumbroton {
  background-image: url("../assets/images/monopoli-money.png");
  color: white;
  height: 300px;
  padding-top: 63px;
}
.image-profile h2 {
  font-size: 32px;
  font-weight: 400;
}
.list-profile li {
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  position: relative; /* Untuk mengatur posisi relatif untuk garis bawah */
  transition: color 0.3s ease; /* Transisi untuk perubahan warna teks */
}

.list-profile li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -1rem;
  width: 120%;
  height: 6px; /* Atur tinggi garis bawah */
  background-color: transparent;
  transition: background-color 0.3s ease; /* Transisi untuk perubahan warna garis bawah */
  transform: translateX(-50%);
}

.list-profile li:hover::after {
  background-color: white; /* Warna garis bawah saat dihover */
}

/* setting */
.nav-settings {
  margin-bottom: 48px;
}
.nav-settings h3 {
  position: relative; /* Untuk mengatur posisi relatif untuk garis bawah */
  transition: color 0.3s ease; /* Transisi untuk perubahan warna teks */
  font-size: 18px;
  display: inline;
}
.nav-settings h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 110%;
  height: 4px; /* Atur tinggi garis bawah */
  background-color: black;
  transition: background-color 0.3s ease; /* Transisi untuk perubahan warna garis bawah */
}

.detail-profile .profile-head h3 {
  font-size: 14px;
}

.profile-group {
  font-size: 14px;
}
.profile-group p {
  margin: 0;
}
.line-profile-group {
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 1px;
}
.btn-edit button {
  border: none;
  font-size: 14px;
  background-color: transparent;
}
.btn-edit button:hover {
  border-bottom: 1px solid black;
}
.profile-head h3 {
  margin: 0;
  letter-spacing: 2px;
  color: #666666;
  font-weight: 300;
}

/* modal */
#form-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 12px;
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
  padding: 15px;
  border: 1px solid black;
}
.resetPass p {
  text-decoration: underline;
  color: black;
  font-weight: 500;
}
</style>
