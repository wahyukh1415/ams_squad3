<script setup>
import { onMounted, watch, ref, reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const errors = reactive({
  email: "",
  password: "",
  response: ""
});

const data = reactive({
  email: "",
  password: "",
});

const hidePassword = ref(true);
const passwordFieldIcon = computed(() =>
  hidePassword.value ? "bi-eye" : "bi-eye-slash"
);
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

const validateEmail = (email) => {
  if (!email) {
    errors.email = "Email Address cannot be empty";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Please enter a valid Email Address";
  } else {
    errors.email = "";
  }
};

const validatePassword = (password) => {
  if (!password) {
    errors.password = "Password cannot be empty";
  } else {
    errors.password = "";
  }
};

onMounted(() => {
  if (localStorage.getItem("auth-user")) {
    router.back();
  }
});

watch(() => data.email, validateEmail);
watch(() => data.password, validatePassword);

function login() {
  if (!errors.email && !errors.password) {
    authenticate();
  }
}

async function authenticate() {
  loading.value = true;

  await axios({
    method: "post",
    url: "http://localhost:8080/login",
    data: data,
  }).then(function (response) {
    // handle success
    if (response.data.code == "0800") {
      const token = `Bearer ${response.data.data.token}`;

      getUser(token);

      router.push({ name: "home" }).then(() => {
        router.go(0);
      });
    } else {
      errors.response = response.data.message;
      data.password = "";
    }
  });

  loading.value = false;
}

async function getUser(token) {
  await axios({
    method: "get",
    url: "http://127.0.0.1:8080/secured/user/current",
    headers: {
      Authorization: token,
    },
  }).then(function (response) {
    const user = response.data.data;
    user["token"] = token;
    localStorage.setItem("auth-user", JSON.stringify(user));
  });
}
</script>

<template>
  <form
    class="p-4 p-md-5 border rounded-3 bg-light"
    @submit.prevent="login"
    novalidate
  >
    <h4 class="text-center mb-4 text-primary">Login</h4>
    <div v-if="errors.response" class="alert alert-danger show" role="alert">
      {{ errors.response }}
    </div>
    <div class="form-floating mb-3">
      <input
        class="form-control"
        type="email"
        :class="{ 'is-invalid': errors.email }"
        name="email"
        id="email"
        v-model="data.email"
        placeholder="user@email.com"
        autocomplete="email"
        required
      />
      <label for="email">Email</label>
      <div v-if="errors.email" class="invalid-feedback">
        {{ errors.email }}
      </div>
    </div>
    <div class="position-relative form-floating mb-3">
      <input
        :type="passwordFieldType"
        class="form-control"
        :class="{ 'is-invalid': errors.password }"
        name="password"
        v-model="data.password"
        id="password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
      <span
        :class="{ 'd-none': errors.password }"
        class="show-password text-secondary position-absolute top-50 end-0 translate-middle-y"
        title="Show password"
      >
        <i
          class="bi"
          :class="passwordFieldIcon"
          @mousedown="hidePassword = !hidePassword"
          @mouseup="hidePassword = !hidePassword"
        ></i>
      </span>
      <label for="password">Password</label>
      <div v-if="errors.password" class="invalid-feedback">
        {{ errors.password }}
      </div>
    </div>
    <button type="submit"
      id="login-button"
      class="w-100 btn btn-lg btn-primary" 
      :disabled="loading">
      <span v-if="!loading">
          Login
      </span>
      <div v-else class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
    <hr class="my-4" />
    <p class="footer text-muted text-center">
      Unlock the World of Auctions with AuctionVerse: Where Bids Meet Bliss!
    </p>
  </form>
</template>

<style scoped>
.alert {
  font-size: small;
  padding: 10px;
}

form h4 {
  font-size: xx-large;
  font-weight: 700;
}

.footer {
  font-size: small;
}

.show-password {
  cursor: pointer;
  padding-right: 14px;
}
</style>