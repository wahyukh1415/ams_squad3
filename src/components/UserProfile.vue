<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
const userProfile = reactive({});
const emailProfile = ref("");
const nameProfile = ref("");

onMounted(() => {
  getUser();
});
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE3MjEzODQ4MDI3NzMsImV4cCI6MzYwMDAwMH0.uBckonYV71yzFISLJ3QRRI8GENtDWv_5iXK3VzxckRM";
async function getUser() {
  const auth = token;
  const response = await axios.get(
    "http://127.0.0.1:8080/secured/user/current",
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );
  const responseJson = response.data.data;
  userProfile.name = responseJson.name;
  userProfile.email = responseJson.email;
  userProfile.role = responseJson.role;
  console.log(responseJson);
}

async function updateProfile() {
  const auth = token;
  const coba = {};

  coba.name = nameProfile.value;
  coba.email = emailProfile.value;

  const response = await axios.put(
    "http://127.0.0.1:8080/secured/user/update-profile",
    coba,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );

  console.log(response);
  location.reload();
  // userProfie.name = responseJson.name;
  // userProfile.email = responseJson.email;
  // userProfile.role = responseJson.role;
}
</script>

<template>
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
        <h2>{{ userProfile.name }}</h2>
      </div>
      <ul class="list-profile d-flex gap-5">
        <li v-if="userProfile.role === 'SELLER'">Selling</li>
        <li v-else-if="userProfile.role === 'BUYER'">Bidding</li>
        <li v-else>Dashboard</li>
        <li>Interest</li>
        <li class="active">Settings</li>
      </ul>
    </div>
    <section class="settings d-flex flex-column gap-5 container mt-5">
      <div class="nav-settings">
        <h3>Details</h3>
      </div>
      <div class="detail-profile">
        <div
          class="profile-head mb-2 row justify-content-between align-items-center"
        >
          <h3 class="col-8">User Profile</h3>
          <div class="btn-edit col-4 text-end">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              EDIT
            </button>
          </div>
          <!-- MODAL -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header border border-0 mx-2">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h1
                    class="modal-title fw-semibold fs-3 mb-5 text-center"
                    id="exampleModalLabel"
                  >
                    Update Profile
                  </h1>
                  <form action="">
                    <div class="form-group">
                      <label for="username">NAME</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        v-model="nameProfile"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        v-model="emailProfile"
                      />
                    </div>
                  </form>
                </div>
                <div
                  class="footerModal d-flex gap-3 px-3 pb-3 justify-content-between"
                >
                  <button
                    type="button"
                    class="btn fw-semibold py-3 w-100 border border-1 border-dark"
                    data-bs-dismiss="modal"
                  >
                    CANCEL
                  </button>
                  <button
                    @click="updateProfile"
                    type="submit"
                    class="btn fw-semibold btn-primary w-100"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- END MODAL -->
        </div>
        <p class="my-4 line-profile-group"></p>
        <div class="wrapper-profile row">
          <div class="col-4"></div>
          <div class="content-profile col-8">
            <div class="profile-group row">
              <p class="user-name col-md-5">NAME</p>
              <p class="col-md-7">{{ userProfile.name }}</p>
            </div>
            <p class="my-4 line-profile-group"></p>
            <div class="profile-group row">
              <p class="user-email col-md-5">EMAIL</p>
              <p class="col-md-7">{{ userProfile.email }}</p>
            </div>
            <p class="my-4 line-profile-group"></p>
            <div class="profile-group row">
              <p class="user-password col-md-5">ROLE</p>
              <p class="col-md-7">{{ userProfile.role }}</p>
            </div>
            <p class="my-4 line-profile-group"></p>
          </div>
        </div>
      </div>
    </section>
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
  font-family: "Poppins", sans-serif;
}

.jumbroton {
  background-image: url("../assets/images/monopoli-money.png");
  color: white;
  height: 300px;
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

/* settings */
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
.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;
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
</style>
