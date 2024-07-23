import { defineStore, storeToRefs } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import { reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

export const useAuctionStore = defineStore('auction', () => {
	const { authUser } = storeToRefs(useAuthStore());
	const { authCheck } = useAuthStore();
	const router = useRouter()
	const auctions = reactive([]);

	onMounted(() => {
		authCheck();
		getAuction();
	});

	async function getAuction() {
		await axios({
			method: 'get',
			url: 'http://127.0.0.1:8080/secured/auction/list?page=1&size=100',
			headers: {
				Authorization: authUser.value.token,
			},
		}).then(function (response) {
			auctions.push(...response.data.data);
		});
	}

	const activeAuctions = computed(() => {
		return auctions.filter(
			(auction) =>
				auction.status === 'APPROVED' && isDatePassed(auction.startedAt)
		);
	});

	const comingAuctions = computed(() => {
		return auctions.filter(
			(auction) =>
				auction.status === 'APPROVED' && !isDatePassed(auction.startedAt)
		);
	});

	const endedAuctions = computed(() => {
		return auctions.filter(
			(auction) =>
				auction.status === 'APPROVED' && isDatePassed(auction.endedAt)
		);
	});

	function isDatePassed(date) {
		const givenDate = new Date(date);
		const currentDate = new Date();

		return currentDate > givenDate;
	}

	function openAuction(auction) {
		router.push({ name: 'detail-auction' });
	}

    return { activeAuctions, comingAuctions, endedAuctions, openAuction }
});
