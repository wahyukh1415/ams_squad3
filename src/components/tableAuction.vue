<script setup>
import axios from "axios";
import { reactive, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const { authUser } = storeToRefs(useAuthStore());
const { authCheck } = useAuthStore();

const listAuction = reactive([]);
const keyword = ref("");
const filteredAuctions = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10; // Define items per page
const hasMoreData = ref(true);

const searchAuctions = () => {
    if (!keyword.value) {
        filteredAuctions.value = listAuction;
    } else {
        filteredAuctions.value = listAuction.filter((auction) =>
            auction.name.toLowerCase().includes(keyword.value.toLowerCase())
        );
    }
};
watch(keyword, searchAuctions);

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
};

const getListAuction = async (page = 1) => {
    const res = await axios.get(
        `http://127.0.0.1:8080/secured/auction/list?page=${page}&size=${itemsPerPage}`,
        {
            headers: {
                Authorization: authUser.value.token,
            },
        }
    );

    res.data.data.forEach((auction) => {
        auction.formattedStartedAt = formatDate(auction.startedAt);
        auction.formattedEndedAt = formatDate(auction.endedAt);
    });

    if (page === 1) {
        listAuction.length = 0; // Clear the list only if it's the first page
    }

    listAuction.push(...res.data.data);
    filteredAuctions.value = listAuction;

    currentPage.value = page;
    hasMoreData.value = res.data.data.length === itemsPerPage; // If less than itemsPerPage, assume no more data
};

const updateAuctionStatus = (id, status) => {
    const baseUrl = "http://127.0.0.1:8080/secured/auction";
    const endpoint =
        status === "APPROVED" ? `${baseUrl}/status` : `${baseUrl}/close`;
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
            reloadListAuction();
        });
};

const reloadListAuction = async () => {
    listAuction.length = 0;
    await getListAuction(); // reload list auction API after update status
};

onMounted(() => {
    authCheck();
    getListAuction();
});

const nextPage = () => {
    if (hasMoreData.value) {
        getListAuction(currentPage.value + 1);
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        getListAuction(currentPage.value - 1);
    }
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
        </div>
        <table class="table table-bordered">
            <thead>
                <tr class="table-dark">
                    <th>No</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Harga Minimum</th>
                    <th>Waktu Mulai</th>
                    <th>Waktu Selesai</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in filteredAuctions" :key="index">
                    <td>{{ data.id }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.description }}</td>
                    <td>Rp. {{ data.minimumPrice }}</td>
                    <td>{{ data.formattedStartedAt }}</td>
                    <td>{{ data.formattedEndedAt }}</td>
                    <td>{{ data.status }}</td>
                    <td>
                        <button
                            class="btn btn-success"
                            title="Approve Auction"
                            v-bind:disabled="data.status === 'CLOSED'"
                            @click="updateAuctionStatus(data.id, 'APPROVED')"
                        >
                            <i class="bi bi-check-circle button-icon"></i>
                        </button>
                        <button
                            class="btn btn-danger"
                            title="Reject Auction"
                            @click="updateAuctionStatus(data.id, 'CLOSED')"
                        >
                            <i class="bi bi-x-circle button-icon"></i>
                        </button>
                    </td>
                </tr>
                <tr v-if="filteredAuctions.length == 0">
                    <td colspan="7">Data not found..</td>
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
    margin-bottom: 20px;
}

.add-auction span {
    display: inline;
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

@media only screen and (min-width: 768px) {
    .form-outline {
        width: 30%;
    }

    .add-auction {
        display: inline;
    }
}
</style>
