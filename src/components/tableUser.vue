<script setup>
import axios from "axios";
import { reactive, onMounted, ref, watch, computed } from "vue";

const baseUrl = "http://localhost:8080/secured/user";
const token = localStorage.getItem('token');

const listUser = reactive([]);
const keyword = ref("");
const filteredUsers = ref([]);

const searchUsers = () => {
  // fungsi search
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
  const res = await axios.get(`${baseUrl}/list?page=1&size=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  listUser.push(...res.data.data);
  filteredUsers.value = listUser;
};

const deleteUser = (name) => {
  axios
    .delete(`${baseUrl}/delete-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
      },
    })
    .then((res) => {
      alert("User deleted successfully");
      reloadListUser();
    });
};

const reloadListUser = async () => {
  listUser.length = 0;
  await getListUser(); // reload daftar pengguna dari API setelah delete
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
          name="search-input"
          v-model="keyword"
          type="search"
          class="form-control"
          placeholder="Search"
        />
      </div>
      <button class="btn btn-primary" title="Add User">
        <i class="bi bi-person-plus-fill"></i>
        <span class="register-button"> Register</span>
      </button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-dark">
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
            <button
              class="btn btn-danger"
              v-bind:disabled="data.name === 'Admin'"
              @click="deleteUser(data.name)"
              title="Delete User"
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.form-outline {
  width: 50%;
}

.register-button {
  display: none;
}

.form-control:focus {
  box-shadow: none;
}

th {
  font-weight: 700;
}

.wrapper {
  padding: 15px 0px;
}

.table {
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .form-outline {
    width: 30%;
  }

  .register-button {
    display: inline;
  }
}
</style>