<script setup>
import { ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import IllustrationLogin from "../components/illustrations/IllustrationLogin.vue";
import { useLoginStore } from "@/stores/login";

const { email, password, hidePassword, passwordFieldIcon, passwordFieldType, isValidEmail, isValidPassword } =
  storeToRefs(useLoginStore());
const { authenticate } = useLoginStore();

watch(email, (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    isValidEmail.value = true;
  } else {
    isValidEmail.value = false;
  }
});

watch(password, (value) => {
  if (value !== '') {
    isValidPassword.value = true;
  } else {
    isValidPassword.value = false;
  }
});
</script>

<template>
  <div class="login bg-primary">
    <div class="container col-xl-10 col-xxl-8 px-4">
      <div class="row align-items-center g-lg-5">
        <div class="position-relative col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 mb-0 text-white">AuctionVerse</h1>
          <p class="col-lg-10 fs-4 mb-3 text-white">
            Elevate Your Bidding Experience
          </p>
          <div class="d-flex align-items-center justify-content-center">
            <IllustrationLogin class="illustration text-white" />
          </div>
        </div>
        <div class="col-md-10 mx-auto col-lg-5">
          <form class="p-4 p-md-5 border rounded-3 bg-light" novalidate>
            <h4 class="text-center mb-4 text-primary">Login</h4>
            <div class="form-floating mb-2">
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': !isValidEmail }"
                name="email"
                v-model="email"
                id="email"
                placeholder="user@email.com"
                autocomplete="email"
                required
              />
              <label for="email">Email</label>
              <div v-if="!isValidEmail" class="invalid-feedback">
                Please enter a valid Email Address
              </div>
            </div>
            <div class="position-relative form-floating mb-3">
              <input
                :type="passwordFieldType"
                class="form-control"
                :class="{ 'is-invalid': !isValidPassword }"
                name="password"
                v-model="password"
                id="password"
                placeholder="Password"
                autocomplete="password"
                required
              />
              <span :class="{ 'd-none': !isValidPassword }" class="show-password text-secondary position-absolute top-50 end-0 translate-middle-y"
                title="Show password"
              >
                <i class="bi"
                  :class="[passwordFieldIcon]"
                  @mousedown="hidePassword = !hidePassword"
                  @mouseup="hidePassword = !hidePassword"></i>
              </span>
              <label for="password">Password</label>
              <div v-if="!isValidPassword" class="invalid-feedback">
                Password cannot be empty
              </div>
            </div>
            <button class="w-100 btn btn-primary" @click.prevent="authenticate">
              Login
            </button>
            <hr class="my-4" />
            <p class="footer text-muted text-center">
              Unlock the World of Auctions with AuctionVerse: Where Bids Meet
              Bliss!
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 700;
}

.illustration {
  display: none;
}

@media (min-width: 992px) {
  .illustration {
    display: block;
    height: 340px;
    width: 340px;
  }
}

.login {
  height: 100dvh;
  display: flex;
  align-items: center;
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
