<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const baseUrl = "http://127.0.0.1:8080/secured/auction";
const updateAuctionStatus = (id, status) => {
  const endpoint = status === APPROVED ? `${baseUrl}/status` : `${baseUrl}/close`;
  axios
    .put(
      endpoint,
      {
        id: id,
        status: status,
      },
      {
        headers: {
          Authorization: authUser.value.token,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
};

onMounted(() => {
  authCheck();
});
</script>

<template>
  <div class="d-flex">
    <button class="btn btn-primary" @click="updateAuctionStatus(3,'APPROVED')">
      APPROVE
    </button>
    <button class="btn btn-warning" @click="updateAuctionStatus(4, 'CLOSED')">
      CLOSE
    </button>
  </div>
</template>