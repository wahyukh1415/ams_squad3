<script setup>
import { ref } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const emailReset = ref("");
const passReset = ref("");
async function resetPass() {
  const newData = {
    email: emailReset.value,
    pass: passReset.value,
  };
  const response = await axios.put(
    "http://localhost:8080/secured/user/reset-password",
    newData,
    {
      headers: {
        Authorization: dataUser.token,
      },
    }
  );
  console.log(newData);
  // localStorage.setItem("auth-user", JSON.stringify(newData));
  location.reload();
}
</script>

<template>
  <section class="container">
    <div class="wrapper-password">
      <h1 class="fs-3 mb-5 title text-center position-relative overflow-hidden">
        <span class="d-inline-block position-relative">Reset Password</span>
      </h1>
      <div class="form-password">
        <h4 class="fs-6">
          Please enter your email address and password to change the password
          for your account.
        </h4>
        <form action="" class="row mt-4 gap-3">
          <div class="form-group row align-items-center">
            <label class="col-3" for="email">Email</label>

            <input
              autocomplete="email"
              type="email"
              class="d-inline col-9"
              placeholder="Email"
              name="email"
              id="email"
              v-model="emailReset"
            />
          </div>
          <div class="form-group row align-items-center">
            <label class="col-3" for="password">New Password</label>
            <input
              type="password"
              class="col-9 tes"
              placeholder="Password"
              name="password"
              id="password"
              v-model="passReset"
            />
          </div>
          <button
            @click="resetPass"
            class="btn btn-pass btn-primary fw-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrapper-password {
  margin: 50px 100px;
}

.title span:before,
.title span:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 1000px;
  height: 0.5px;
  background-color: #cccccc;
}
.title span:before {
  right: 100%;
  margin-right: 10px;
  transform: translateY(-50%);
}

.title span:after {
  left: 100%;
  margin-left: 10px;
  transform: translateY(-50%);
}

.form-group input {
  width: 350px;
  padding: 8px 10px;
}

.btn-pass {
  width: 150px;
  padding: 12px 0;
}

/* form */
</style>
