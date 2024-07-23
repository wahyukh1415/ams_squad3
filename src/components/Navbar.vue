<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import Logo from "./logo/Logo.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const { authCheck, logout } = useAuthStore();

const data = localStorage.getItem("auth-user");
const user = JSON.parse(data);
console.log(user.role);

const toogleProfile = ref(false);

onMounted(() => {
  authCheck();
});
</script>

<template>
  <nav class="navbar py-3 border-2 border-bottom">
    <div class="container">
      <div class="row navbar-collapse" id="navbarTogglerDemo01">
        <div class="col">
          <Logo class="logo" />
        </div>

        <ul class="nav justify-content-center col-auto text-center">
          <li class="nav-item">
            <RouterLink class="nav-link active fs-5 fw-semibold" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item" v-if="user.role === 'ADMIN'">
            <RouterLink class="nav-link active fs-5 fw-semibold" to="/dashboard"
              >Dashboard</RouterLink
            >
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5 fw-semibold" aria-current="page" href="#"
              >List Auction</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5 fw-semibold" href="#">Rules</a>
          </li>
        </ul>

        <div class="col text-end">
          <div class="nav-item dropdown">
            <div
              class="profile-dropdown position-relative d-flex align-items-center justify-content-end"
            >
              <div id="profile-account" @click="toogleProfile = !toogleProfile">
                <img
                  src="../assets/images/profile-image.jpg"
                  width="45"
                  height="45"
                  alt="profile"
                  class="rounded-circle"
                />
                <i class="bi bi-caret-down-fill"></i>
              </div>

              <ul
                class="profile-menu position-absolute z-3"
                v-if="toogleProfile"
              >
                <RouterLink to="/user-profile" class="list-drp">
                  <span class="icon-drp"><i class="bi bi-person"></i></span>
                  <a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading3"
                  >
                    Profile</a
                  >
                </RouterLink>
                <li class="list-drp">
                  <span class="icon-drp"><i class="bi bi-cash-stack"></i></span>
                  <a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading4"
                  >
                    Auction</a
                  >
                </li>
                <RouterLink
                  v-if="user.role === 'ADMIN'"
                  class="list-drp"
                  to="/register-buyer"
                >
                  <span class="icon-drp"
                    ><i class="bi bi-emoji-sunglasses"></i
                  ></span>
                  <a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading4"
                  >
                    Register Buyer</a
                  >
                </RouterLink>
                <RouterLink
                  v-if="user.role === 'ADMIN'"
                  class="list-drp"
                  to="/register-seller"
                >
                  <span class="icon-drp"
                    ><img
                      width="20"
                      src="../assets/images/money-eyes.png"
                      alt=""
                  /></span>
                  <a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading4"
                  >
                    Register Seller</a
                  >
                </RouterLink>
                <RouterLink
                  v-if="user.role === 'ADMIN'"
                  class="list-drp"
                  to="/reset-password"
                >
                  <span class="icon-drp"
                    ><i class="bi bi-person-lock"></i
                  ></span>
                  <a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading4"
                  >
                    Reset Password</a
                  >
                </RouterLink>
                <li class="list-drp" @click="logout">
                  <span class="icon-drp"
                    ><i class="bi bi-box-arrow-right"></i></span
                  ><a
                    class="dropdown-item fw-semibold"
                    href="#scrollspyHeading5"
                  >
                    Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
.nav-link {
  color: black;
  position: relative;
}
.nav-link:hover {
  color: #5277a5;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -1rem;
  width: 100%;
  height: 6px; /* Atur tinggi garis bawah */
  background-color: transparent;
  transition: background-color 0.3s ease; /* Transisi untuk perubahan warna garis bawah */
  transform: translateX(-50%);
}
.nav-link:hover::after {
  background-color: #5277a5;
}
.logo {
  width: 200px;
  height: 45px;
}
.profile-menu {
  top: 55px;
  right: 0px;
  list-style: none;
  text-align: left;
  background-color: white;
  padding: 15px 0;
  border-radius: 5px;
  width: 200px;
  border: 1px solid black;
}
.profile-menu .list-drp {
  padding: 4px 15px;
  font-size: 18px;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: black;
}
.profile-menu .list-drp:hover {
  background-color: rgba(207, 232, 253, 0.5);
  color: #5277a5;
}

.icon-drp {
  width: 30px;
}
</style>
