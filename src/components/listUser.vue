<script setup>
import axios from "axios";
import { reactive, onMounted, ref, watch } from "vue";

const url = "http://localhost:8080/secured/user/list?page=1&size=100";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMwNzI2NzAyMywiZXhwIjozNjAwMDAwfQ.KJrlVbfJF0dlj_3jBxVDUXyiJIBGG8d7ZYSojgPVnGA";
const listUser = reactive([]);
const filteredUsers = reactive([]);
const searchKeyword = ref("");

const getListUser = async () => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  listUser.push(...res.data.data);
};

onMounted(() => {
  getListUser();
});


</script>

<template>
  <div>
    <div class="wrapper d-flex justify-content-between">
      <div class="form-outline">
        <input
          v-model="searchKeyword"
          type="search"
          class="form-control"
          placeholder="Search"
        />
      </div>
      <button class="btn btn-primary">Register</button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="col-1">No</th>
          <th class="col-8">Nama</th>
          <th class="col-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in listUser" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.name }}</td>
          <td>
            <button class="btn btn-danger">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table{
  text-align: center;
}

th {
  font-weight: 700;
  background: rgb(167, 197, 202);
}

.form-outline {
  width: 30%;
}

.form-control:focus {
  box-shadow: none;
}

.wrapper{
  padding: 20px 0px;
}
</style>