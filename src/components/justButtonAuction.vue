<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useAuthStore } from "../stores/auth";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const baseUrl = "http://127.0.0.1:8080/secured/auction";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3LCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzIxNDg4Njk2Njg2LCJleHAiOjM2MDAwMDB9.bAvbzUkpBE8nKHkJf8P_4p9CNQaSLpau5AhCa9yjid0"
const approveAuction = (data) => {
  axios
    .post(`${baseUrl}/status`, {
      headers: {
        Authorization: authUser.value.token,
      },
      data: {
        id: data,
        status: "APPROVED",
      },
    })
    .then(() => {
      console.log(res);
    });
};

const closeAuction = (data) => {
  axios
    .post(`${baseUrl}/close`, {
      headers: {
        Authorization: authUser.value.token,
      },
      data: {
        id: data,
        status: "CLOSED",
      },
    })
    .then(() => {
      console.log(res);
    });
};

onBeforeMount(() => {
  authCheck();
});

// http://127.0.0.1:8080/secured/auction/status
</script>

<template>
  <div class="d-flex">
    <button class="btn btn-primary" @click="approveAuction(1)">APPROVE</button>
    <button class="btn btn-warning" @click="closeAuction(1)">CLOSE</button>
  </div>
</template>