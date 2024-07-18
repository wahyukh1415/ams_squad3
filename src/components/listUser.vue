<script setup>
import axios from "axios";
import { reactive, onMounted, ref, watch, computed } from "vue";

const url = "http://localhost:8080/secured/user/list?page=1&size=100";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxMTYxMTMyMSwiZXhwIjozNjAwMDAwfQ.OPdHERSgbDK0-yzZW9HwLDsmZ6yymgIrCltQAVGY3a0"
const listUser = reactive([]);
const keyword = ref("");
const filteredUsers = ref([]);

const searchUsers = () => {
  if (!keyword.value) {
    filteredUsers.value = listUser;
  } else {
    filteredUsers.value = listUser.filter((user) =>
      user.name.toLowerCase().includes(keyword.value.toLowerCase())
    );
  }
};

watch(keyword, searchUsers);

const getListUser = async () => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  listUser.push(...res.data.data);
  filteredUsers.value = listUser
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
          v-model="keyword"
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
          <th class="col-9">Nama</th>
          <th class="col-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in filteredUsers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.name }}</td>
          <td>
            <button class="btn btn-danger" v-bind:disabled="data.name === 'Admin'">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
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

.wrapper {
  padding: 15px 0px;
}
</style>