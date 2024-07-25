<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import Logo from "./logo/Logo.vue";
const { authCheck, logout } = useAuthStore();

const data = localStorage.getItem("auth-user");
const user = JSON.parse(data);
const avatarUrl = ref("");

const generateAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&rounded=true&background=cfe8fc80&color=5277a5`;
};
const isMenuOpen = ref(false);
const isProfileOpen = ref(false);
onMounted(() => {
  authCheck();
  avatarUrl.value = generateAvatar(user.name);
});
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 z-3 shadow"
  >
    <div class="container">
      <!-- offcanvas toogler 1 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        aria-expanded="false"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- logo -->
      <div class="col">
        <Logo class="logo" />
      </div>

      <!-- offcanvas1 -->
      <div
        class="offcanvas offcanvas-start justify-content-center col-auto text-center"
        tabindex="-1"
        aria-labelledby="offcanvasNavbarLabel"
        id="offcanvasNavbar"
      >
        <!-- offcanvas header -->
        <div class="offcanvas-header">
          <div class="offcanvas-title" id="offcanvasNavbarLabel">
            <Logo class="logo" />
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <!-- offcanvas body -->
        <div
          class="offcanvas-body justify-content-lg-center justify-content-start col-auto"
        >
          <ul class="nav d-flex flex-column flex-lg-row gap-lg-0 gap-2">
            <li class="nav-item">
              <RouterLink class="nav-link active fs-6 fw-semibold" to="/"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item" v-if="user.role === 'ADMIN'">
              <RouterLink
                class="nav-link active fs-6 fw-semibold"
                to="/dashboard"
                >Dashboard</RouterLink
              >
            </li>
            <li class="nav-item">
              <a class="nav-link fs-6 fw-semibold" aria-current="page" href="#"
                >List Auction</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link fs-6 fw-semibold" href="#">Rules</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- avatar coba -->
      <div
        class="col text-end d-flex flex-row align-items-center justify-content-end gap-1"
      >
        <div>
          <h1 class="fs-6 text-primary fw-bold m-0">{{ user.name }}</h1>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="dropdown-toggle border-0 bg-transparent text-primary-400 fs-5"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img :src="avatarUrl" width="45" height="45" alt="profile" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end py-3 profile-drp">
            <RouterLink
              to="/user-profile"
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
            >
              <span>
                <i class="bi bi-person"></i>
              </span>

              <p class="fw-semibold fs-6 p-0 m-0">Profile</p>
            </RouterLink>
            <li
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
            >
              <span><i class="bi bi-cash-stack"></i></span>
              <p class="fw-semibold fs-6 p-0 m-0">Auction</p>
            </li>
            <RouterLink
              v-if="user.role === 'ADMIN'"
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
              to="/register-buyer"
            >
              <span><i class="bi bi-emoji-sunglasses"></i></span>
              <p class="fw-semibold fs-6 p-0 m-0">Register Buyer</p>
            </RouterLink>
            <RouterLink
              v-if="user.role === 'ADMIN'"
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
              to="/register-seller"
            >
              <span
                ><img width="16" src="../assets/images/money-eyes.png" alt=""
              /></span>
              <p class="fw-semibold fs-6 p-0 m-0">Register Seller</p>
            </RouterLink>
            <RouterLink
              v-if="user.role === 'ADMIN'"
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
              to="/reset-password"
            >
              <span><i class="bi bi-person-lock"></i></span>
              <p class="fw-semibold fs-6 p-0 m-0">Reset Password</p>
            </RouterLink>
            <li
              class="d-flex list-drop text-black text-decoration-none align-items-center px-3 gap-2 py-1"
              @click="logout"
            >
              <span><i class="bi bi-box-arrow-right"></i></span>
              <p class="fw-semibold fs-6 p-0 m-0">Logout</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- avatar -->
    </div>
  </nav>
</template>
<style scoped>
nav {
  padding: 12px 0;
}
.nav-link {
  color: black;
  position: relative;
}
.nav-link:hover {
  color: #5277a5;
}
.logo {
  color: #5277a5;
  width: 200px;
  height: 45px;
}

.profile-menu.active {
  display: block;
}
.profile-drp {
  width: 200px;
}
.profile-drp .list-drop:hover {
  background-color: rgba(207, 232, 252, 0.502);
}
.profile-drp p:hover {
  color: #5277a5;
}
@media (min-width: 992px) {
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
}
@media (max-width: 992px) {
  .nav-item:hover {
    background-color: rgba(207, 232, 252, 0.502);
  }
}
</style>
