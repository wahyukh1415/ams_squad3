<script setup>
import axios from "axios";
import { reactive, onMounted, onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const baseUrl = "http://localhost:8080/secured/user";

const listUser = reactive([]);
const keyword = ref("");
const filteredUsers = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;
const hasMoreData = ref(true);
const showDropdown = ref(false);

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

const getListUser = async (page = 1) => {
  const res = await axios.get(
    `${baseUrl}/list?page=${page}&size=${itemsPerPage}`,
    {
      headers: {
        Authorization: authUser.value.token,
      },
    }
  );

  listUser.push(...res.data.data);
  filteredUsers.value = listUser;

  currentPage.value = page;
  hasMoreData.value = res.data.data.length >= itemsPerPage; // If less than itemsPerPage, assume no more data
};

const deleteUser = (name) => {
  axios
    .delete(`${baseUrl}/delete-user`, {
      headers: {
        Authorization: authUser.value.token,
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
  await getListUser(); // reload list user API after delete
};

onBeforeMount(() => {
  authCheck();
  getListUser();
});

const nextPage = () => {
  if (hasMoreData.value) {
    listUser.length = 0;
    getListUser(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    listUser.length = 0;
    getListUser(currentPage.value - 1);
  }
};

const getRowNumber = (index) => {
  return (currentPage.value - 1) * itemsPerPage + index + 1; //keeps the numbers in the next table in sequence
};
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
      <div class="d-flex gap-2">
        <RouterLink to="/reset-password">
          <button
            type="button"
            title="reset password"
            class="btn btn-primary h-100"
          >
            <i class="bi bi-pencil-square mx-1"></i>
            <span class="btn-text ">Reset Password</span>
          </button>
        </RouterLink>
        <div id="btn-dropdown">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle h-100"
            @click="showDropdown = !showDropdown"
            title="Add User"
          >
            <i class="bi bi-person-plus-fill mx-1"></i>
            <span class="btn-text">Register</span>
          </button>
          <ul
            class="list-group list-unstyled position-absolute z-1 mt-1 bg-white"
            v-if="showDropdown"
          >
            <li>
              <RouterLink class="list-group-item" to="/register-seller"
                >Register Seller</RouterLink
              >
            </li>
            <li>
              <RouterLink class="list-group-item" to="/register-buyer"
                >Register Buyer</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
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
          <td>{{ getRowNumber(index) }}</td>
          <td>{{ data.name }}</td>
          <td>
            <button
              class="btn btn-danger"
              :disabled="data.name === 'Admin'"
              @click="deleteUser(data.name)"
              title="Delete User"
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td></td>
          <td>Data not found..</td>
          <td></td>
        </tr>
        <tr
          class="row-height"
          v-for="i in itemsPerPage - filteredUsers.length"
          :key="i"
        >
          <!-- just adding blank row if data less than 10 -->
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper">
      <button
        class="btn btn-secondary"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <span>Page {{ currentPage }}</span>
      <button
        class="btn btn-secondary"
        :disabled="!hasMoreData"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-outline {
  width: 50%;
}

.btn-text {
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

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}

.pagination-wrapper button {
  margin: 0 10px;
}

.list-group-item:hover {
  background-color: #a3b5e9;
  cursor: pointer;
}

.row-height {
  height: 50px;
}

@media only screen and (min-width: 768px) {
  .form-outline {
    width: 30%;
  }

  .btn-text {
    display: inline;
  }
}
</style>