<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
const BASE_API = "http://localhost:8080/secured/user";
const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTI5NDMwNDk0MywiZXhwIjozNjAwMDAwfQ._5yyyzHa06cFzhoPpk9VAhYk6PZYzF_8nHHKG-qjhzI";
const headers = {
  Authorization: authToken,
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const listUser = reactive([
  {
    id: 1,
    nama: "kevin",
  },
  {
    id: 2,
    nama: "agus",
  },
  {
    id: 3,
    nama: "kusuma",
  },
]);

const getListUser = async () => {
  const res = await axios.get(BASE_API + "/list?page=1&size=100", headers);
  listUser.push(...res.data);
  console.log(listUser);
};

onMounted(() => {
  getListUser();
});
</script>
<template>
  <div>
    <h3>This is List User Component</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in listUser" :key="data.id">
          <td>{{ data.id }}</td>
          <td>{{ data.nama }}</td>
          <td>
            <button class="btn btn-danger">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>