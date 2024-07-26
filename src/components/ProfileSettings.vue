<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { onMounted, watch, reactive, ref } from "vue";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const emailProfile = ref("");
const nameProfile = ref("");
const errors = reactive({
  email: "",
  username: "",
  response: "",
});

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();
let data = localStorage.getItem("auth-user");
const dataUser = JSON.parse(data);
const isDisabled = ref(false);
const validateEmail = (email) => {
  if (!email) {
    errors.email = "Email Address cannot be empty";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Please enter a valid Email Address";
  } else {
    errors.email = "";
  }
};

const validateUsername = (userName) => {
  if (!userName) {
    errors.username = "Username cannot be empty";
  } else {
    errors.username = "";
  }
};

watch(() => emailProfile.value, validateEmail);
watch(() => nameProfile.value, validateUsername);

watch(
  [() => errors.email, () => errors.username],
  () => {
    isDisabled.value = !!errors.email || !!errors.username;
  },
  { immediate: true }
);

onMounted(() => {
  authCheck();
});

function updateProfile() {
  if (errors.email === "" || errors.username === "") {
    authentication();
  }
}
console.log(errors.email);

async function authentication() {
  const newData = {
    ...authUser.value,
    name: nameProfile.value,
    email: emailProfile.value,
  };
  const response = await axios.put(
    "http://127.0.0.1:8080/secured/user/update-profile",
    newData,
    {
      headers: {
        Authorization: dataUser.token,
      },
    }
  );
  localStorage.setItem("auth-user", JSON.stringify(newData));
  location.reload();
}
</script>

<template>
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
          <div class="modal-dialog modal-dialog-centered">
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
                  class="modal-title fw-semibold fs-3 mb-3 text-center text-primary"
                  id="exampleModalLabel"
                >
                  Update Profile
                </h1>

                <form
                  action=""
                  id="form-modal"
                  class="d-flex flex-column gap-4"
                >
                  <div class="form-group position-relative">
                    <label for="username" class="position-absolute bg-white"
                      >NAME</label
                    >
                    <input
                      class="w-100 border border-1 border-black p-3 rounded-1"
                      :class="{ 'is-invalid': errors.username }"
                      type="text"
                      minlength="1"
                      maxlength="30"
                      id="username"
                      autocomplete="username"
                      name="username"
                      placeholder="Enter your name"
                      v-model="nameProfile"
                    />
                    <div v-if="errors.username" class="invalid-feedback">
                      {{ errors.username }}
                    </div>
                  </div>

                  <div class="form-group position-relative">
                    <label for="email" class="position-absolute bg-white"
                      >EMAIL</label
                    >
                    <input
                      class="w-100 border border-1 border-black p-3 rounded-1"
                      :class="{ 'is-invalid': errors.email }"
                      autocomplete="email"
                      type="email"
                      minlength="1"
                      maxlength="25"
                      id="email"
                      placeholder="Enter your email"
                      v-model="emailProfile"
                    />
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
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
                  :class="isDisabled ? ' btn-dissabled ' : 'btn-primary'"
                  class="btn fw-semibold btn-primary w-100"
                  :disabled="isDisabled"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- END MODAL -->
      </div>
      <p class="my-4 line-profile-group bg-black w-100"></p>
      <div class="wrapper-profile row">
        <div class="col-lg-4 col-0"></div>
        <div class="content-profile col-8">
          <div class="profile-group row">
            <p class="user-name col-md-5 m-0">NAME</p>
            <p class="col-md-7 m-0 m-0">{{ authUser.name }}</p>
          </div>
          <p class="my-4 line-profile-group bg-black w-100"></p>
          <div class="profile-group row">
            <p class="user-email col-md-5 m-0">EMAIL</p>
            <p class="col-md-7 m-0">{{ authUser.email }}</p>
          </div>
          <p class="my-4 line-profile-group bg-black w-100"></p>
          <div class="profile-group row">
            <p class="user-password col-md-5 m-0">ROLE</p>
            <p class="col-md-7 m-0">{{ authUser.role }}</p>
          </div>
          <p class="my-4 line-profile-group bg-black w-100"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
.line-profile-group {
  opacity: 0.1;
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
  margin-bottom: 12px;
}
.form-group label {
  padding: 0 5px;
  font-size: 12px;
  top: -10px;
  left: 10px;
}
.btn-dissabled {
  cursor: not-allowed;
  pointer-events: none;
}
</style>
