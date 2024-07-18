<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTI5ODI5NDE1MywiZXhwIjozNjAwMDAwfQ.e1VRSP6djd4Wgj3I5sIMF84Yk2V124OwBizz8yiK3_o";

const listUser = reactive([]);

const listDummy = reactive([
  {
    nama: "affi",
  },
  {
    nama: "kusuma",
  },
  {
    nama: "zaenab",
  },
]);

const getListUser = async () => {
  const res = await axios.get(
    "http://localhost:8080/secured/user/list?page=1&size=100",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  listUser.push(...res.data.data);
  console.log(res);
};

onMounted(() => {
  getListUser();
});
</script>
<template>
  <div>
    <h3>This is List User Component</h3>
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
th {
  font-weight: 700;
}
</style>